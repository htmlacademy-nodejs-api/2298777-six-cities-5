import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { injectable, inject } from 'inversify';
import { Component } from '../shared/types/index.js';
import { DbClient } from '../shared/libs/db-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';

@injectable()
export class RestApplication {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DBClient) private readonly dbClient: DbClient
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
  }
}
