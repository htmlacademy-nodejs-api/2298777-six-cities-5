import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { injectable, inject } from 'inversify';
import { Component } from '../shared/types/index.js';
import { DbClient } from '../shared/libs/db-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import express, { Express } from 'express';
import { CommentController } from '../shared/models/comment/comment.controller.js';
import { RentController } from '../shared/models/rent/rent.controller.js';
import { UserController } from '../shared/models/user/user.controller.js';

@injectable()
export class RestApplication {
  private express: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DBClient) private readonly dbClient: DbClient,
    @inject(Component.CommentController) private readonly commentController: CommentController,
    @inject(Component.RentController) private readonly rentController: RentController,
    @inject(Component.UserController) private readonly userController: UserController,
  ) {
    this.express = express();
  }

  private async initDB() {
    return await this.dbClient.connect(getMongoURI(
      this.config.get('DB_USERNAME'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    ));
  }

  private async initControllers() {
    this.express.use('/comments', this.commentController.router);
    this.express.use('/rents', this.rentController.router);
    this.express.use('/users', this.userController.router);
  }

  private async initServer() {
    this.express.listen(this.config.get('PORT'));
  }

  private async initMiddleware() {
    this.express.use(express.json());
  }

  public async init() : Promise<void> {
    this.logger.info('Rest application init');

    this.logger.info('Init database');
    await this.initDB();
    this.logger.info('Init database completed');

    this.logger.info('Init middleware');
    await this.initMiddleware();
    this.logger.info('Init middleware completed');

    this.logger.info('Init Controllers');
    await this.initControllers();
    this.logger.info('Init controllers completed');

    this.logger.info('Init server');
    await this.initServer();
    this.logger.info(`Server started on localhost:${this.config.get('PORT')}`);
  }
}
