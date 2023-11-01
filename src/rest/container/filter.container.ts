import { Container } from 'inversify';
import { ExceptionFilter } from '../../shared/libs/rest/index.js';
import { Component } from '../../shared/types/component.enum.js';
import { DefaultExceptionFilter } from '../../shared/libs/rest/index.js';
import { DeffaultAuthExceptionFilter } from '../../shared/models/auth/auth-exception-filter.js';

export const createFilterContainer = () => {
  const container = new Container();

  container.bind<ExceptionFilter>(Component.ExceptionFilter).to(DefaultExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(DeffaultAuthExceptionFilter).inSingletonScope();

  return container;
};
