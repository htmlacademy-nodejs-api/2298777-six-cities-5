import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from '../index.js';
import { Component } from '../../shared/types/index.js';
import { RestConfig, RestSchema, Config } from '../../shared/libs/config/index.js';
import { Logger, PinoLogger } from '../../shared/libs/logger/index.js';
import { DbClient } from '../../shared/libs/db-client/index.js';
import { MongoDBClient } from '../../shared/libs/db-client/index.js';

export const createRestContainer = () => {
  const container = new Container();

  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<DbClient>(Component.DBClient).to(MongoDBClient).inSingletonScope();

  return container;
};
