import { Container } from 'inversify';
import { Middleware } from '../../shared/libs/rest/middleware/index.js';
import { Component } from '../../shared/types/index.js';
import { ParseTokenMiddleware } from '../../shared/libs/rest/middleware/index.js';

export const createMiddlewareContainer = () => {
  const container = new Container();

  container.bind<Middleware>(Component.ParseTokenMiddleware).to(ParseTokenMiddleware).inSingletonScope();

  return container;
};
