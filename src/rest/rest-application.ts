import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Loger } from '../shared/libs/loger/index.js';

export class RestApplication {

  constructor(
    private readonly loger: Loger,
    private readonly config: Config<RestSchema>,
  ) {}

  public async init() : Promise<void> {
    this.loger.info('Rest application init');
    this.loger.info(`Port is ${this.config.get('PORT')}`);
  }
}
