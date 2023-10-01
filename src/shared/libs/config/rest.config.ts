import { Config, RestSchema, configRestSchema } from './index.js';
import { Logger } from '../logger/index.js';
import { config } from 'dotenv';
import { injectable, inject } from 'inversify';
import { Component } from '../../types/component.enum.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    const parsedConfig = config();

    if (parsedConfig.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});
    configRestSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file successfully parsed.');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    const value = this.config[key];

    if (!value) {
      throw new Error('Invalid key.');
    }

    return value;
  }
}
