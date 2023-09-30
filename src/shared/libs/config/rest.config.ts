import { Config, RestSchema, configRestSchema } from './index.js';
import { Loger } from '../loger/index.js';
import { config } from 'dotenv';

export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    private readonly loger: Loger,
  ) {
    const parsedConfig = config();

    if (parsedConfig.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});
    configRestSchema.validate({allowed: 'strict', output: this.loger.info});

    this.config = configRestSchema.getProperties();
    this.loger.info('.env file successfully parsed.');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    const value = this.config[key];

    if (!value) {
      throw new Error('Invalid key.');
    }

    return value;
  }
}
