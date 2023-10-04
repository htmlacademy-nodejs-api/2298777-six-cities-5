import 'reflect-metadata';
import { Container as InversifyContainer } from 'inversify';
import { RestApplication } from './rest-application.js';
import { Component } from '../shared/types/index.js';
import { RestConfig, RestSchema, Config } from '../shared/libs/config/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { DbClient } from '../shared/libs/db-client/db-client.interface.js';
import { MongoDBClient } from '../shared/libs/db-client/mongo.db-client.js';

type ComponentType = {
  RestApplication: RestApplication,
  Config: Config<RestSchema>,
  Logger: Logger,
}

export class Container {
  private container: InversifyContainer;

  constructor() {
    this.container = new InversifyContainer();
    this.container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
    this.container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
    this.container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
    this.container.bind<DbClient>(Component.DBClient).to(MongoDBClient).inSingletonScope();
  }

  public get<T extends keyof ComponentType>(key: T): ComponentType[T] {
    return this.container.get(key);
  }
}
