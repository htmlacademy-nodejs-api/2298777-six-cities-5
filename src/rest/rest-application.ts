import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { injectable, inject } from 'inversify';
import { Component } from '../shared/types/index.js';
import { DbClient } from '../shared/libs/db-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { UserService } from '../shared/models/user/index.js';
import { RentService } from '../shared/models/rent/rent-service.interface.js';
//import { CommentService } from '../shared/models/comment/comment-service.interface.js';

@injectable()
export class RestApplication {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DBClient) private readonly dbClient: DbClient,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.RentService) private readonly rentService: RentService,
    //@inject(Component.CommentService) private readonly commentService: CommentService,
  ) {}

  private async initDB() {
    return await this.dbClient.connect(getMongoURI(
      this.config.get('DB_USERNAME'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    ));
  }

  public async init() : Promise<void> {
    this.logger.info('Rest application init');

    this.logger.info('Init database');
    await this.initDB();
    this.logger.info('Init database completed');

    this.userService.create({
      name: 'yuriy',
      password: 'bussing',
      email: 'buss@mail.ru',
      avatar: 'deff.jpg',
      isPro: true,
    }, 'random');

    this.rentService.create({
      title: '1sgsgf',
      description: 'dafsdfs',
      date: 'fdsfs',
      city: 'fdsfsdfs',
      preview: 'fdsfsf',
      images: ['fdsfsf'],
      isFavorite: true,
      isPremium: true,
      rating: 1,
      type: 'fdsf',
      bedrooms: 2,
      maxAdults: 2,
      price: 1033,
      goods: ['fsdfsd'],
      authorId: '65256ef8e0b56ce3608a3653',
      location: {
        latitude: 31231,
        longitude: 31312,
      }
    });
  }
}
