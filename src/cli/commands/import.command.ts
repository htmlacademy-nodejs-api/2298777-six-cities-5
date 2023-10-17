import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { getErrorMessage, createRent, getMongoURI } from '../../shared/helpers/index.js';
import { Rent } from '../../shared/types/index.js';
import { Config, RestConfig, RestSchema } from '../../shared/libs/config/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { DbClient, MongoDBClient } from '../../shared/libs/db-client/index.js';
import { DefaultUserService, UserModel, UserService } from '../../shared/models/user/index.js';
import { CommentModel, CommentService, DefaultCommentService } from '../../shared/models/comment/index.js';
import { DefaultRentService, RentModel, RentService } from '../../shared/models/rent/index.js';

export class ImportCommand implements Command {
  private readonly logger: Logger;
  private salt: string;
  private readonly config: Config<RestSchema>;
  private readonly dbClient: DbClient;
  private readonly userService: UserService;
  private readonly commentService: CommentService;
  private readonly rentService: RentService;

  constructor () {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.config = new RestConfig(this.logger);
    this.dbClient = new MongoDBClient(this.logger, this.config);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.commentService = new DefaultCommentService(this.logger, CommentModel);
    this.rentService = new DefaultRentService(this.logger, RentModel);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const rent = createRent(line);
    await this.saveRent(rent);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows was imported`);
    this.dbClient.disconnect();
  }

  private async saveRent(rent: Rent) {
    const user = await this.userService.findOrCreate({
      name: rent.author.name,
      email: rent.author.email,
      isPro: rent.author.isPro,
      avatar: rent.author.avatar,
      password: Math.random().toString(36).slice(-8),
    }, this.salt);

    const comments : string[] = [];
    for (const comment of rent.comments) {
      const currentComment = await this.commentService.create({
        comment: comment.comment,
        authorId: user.id,
        rating: comment.rating,
        date: comment.date,
      });
      comments.push(currentComment.id);
    }

    await this.rentService.create({
      title: rent.title,
      description: rent.description,
      date: rent.date,
      city: rent.city,
      preview: rent.preview,
      images: rent.images,
      isPremium: rent.isPremium,
      isFavorite: rent.isFavorite,
      rating: rent.rating,
      type: rent.type,
      bedrooms: rent.bedrooms,
      maxAdults: rent.maxAdults,
      price: rent.price,
      goods: rent.goods,
      authorId: user.id,
      commentsIds: comments,
      commentsCount: comments.length,
      location: rent.location,
    });
  }


  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbName: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, this.config.get('DB_PORT'), dbName);
    this.salt = salt;

    await this.dbClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err) {
      console.error(`Can't import data from file: ${filename}`);
      getErrorMessage(err);
    }
  }
}
