import { Container } from 'inversify';
import { ExceptionFilter } from '../../shared/libs/rest/index.js';
import { Component } from '../../shared/types/index.js';
import { AppExceptionFilter } from '../../shared/libs/rest/index.js';
import { DefaultAuthExceptionFilter } from '../../shared/models/auth/index.js';
import { ValidationExceptionFilter } from '../../shared/libs/rest/exception-filter/index.js';
import { HttpExceptionFilter } from '../../shared/libs/rest/exception-filter/index.js';
import { PathInterceptor } from '../../shared/libs/rest/index.js';

export const createFilterContainer = () => {
  const container = new Container();

  container.bind<ExceptionFilter>(Component.AppExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(DefaultAuthExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpExceptionFilter).inSingletonScope();
  container.bind<PathInterceptor>(Component.PathInterceptor).to(PathInterceptor).inSingletonScope();

  return container;
};
