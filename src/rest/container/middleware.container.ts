import { Container } from 'inversify';
import { Middleware } from '../../shared/middleware/middleware.interface.js';
import { Component } from '../../shared/types/component.enum.js';
import { ParseTokenMiddleware } from '../../shared/middleware/parse-token.middleware.js';

export const createMiddlewareContainer = () => {
  const container = new Container();

  container.bind<Middleware>(Component.ParseTokenMiddleware).to(ParseTokenMiddleware).inSingletonScope();

  return container;
};
