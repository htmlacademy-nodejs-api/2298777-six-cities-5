import { Loger } from '../shared/libs/loger/index.js';

export class RestApplication {

  constructor(private readonly loger: Loger) {}

  public async init() : Promise<void> {
    this.loger.info('Rest application init');
  }
}
