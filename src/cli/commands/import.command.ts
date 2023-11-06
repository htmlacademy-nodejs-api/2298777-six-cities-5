import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { getErrorMessage, createRent, getMongoURI } from '../../shared/helpers/index.js';
import { City, Good, Rent, Type } from '../../shared/types/index.js';
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
    this.commentService = new DefaultCommentService(this.logger, CommentModel, RentModel);
    this.rentService = new DefaultRentService(this.logger, RentModel, UserModel);
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

  private async saveRent(dto: Rent) {
    const user = await this.userService.findOrCreate({
      name: dto.author.name,
      email: dto.author.email,
      isPro: dto.author.isPro,
      avatar: dto.author.avatar,
      password: Math.random().toString(36).slice(-8),
    }, this.salt);

    const rent = await this.rentService.create({
      title: dto.title,
      description: dto.description,
      city: dto.city as City,
      preview: dto.preview,
      images: dto.images,
      isPremium: dto.isPremium,
      type: dto.type as Type,
      bedrooms: dto.bedrooms,
      maxAdults: dto.maxAdults,
      price: dto.price,
      goods: dto.goods as Good[],
      userId: user.id,
      location: dto.location,
    });

    for (const comment of dto.comments) {
      await this.commentService.create({
        comment: comment.comment,
        userId: user.id,
        rating: comment.rating,
        rentId: rent.id
      });
    }
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
