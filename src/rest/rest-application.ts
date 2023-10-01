import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { injectable, inject } from 'inversify';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async init() : Promise<void> {
    this.logger.info('Rest application init');
    this.logger.info(`Port is ${this.config.get('PORT')}`);
  }
}
