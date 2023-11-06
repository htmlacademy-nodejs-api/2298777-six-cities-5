import { Container } from 'inversify';
import { ExceptionFilter } from '../../shared/libs/rest/index.js';
import { Component } from '../../shared/types/component.enum.js';
import { AppExceptionFilter } from '../../shared/libs/rest/index.js';
import { DeffaultAuthExceptionFilter } from '../../shared/models/auth/auth-exception-filter.js';
import { ValidationExceptionFilter } from '../../shared/libs/rest/exception-filter/validation-exception-filter.js';
import { HttpExceptionFilter } from '../../shared/libs/rest/exception-filter/http-exception-filter.js';
import { PathInterceptor } from '../../shared/libs/rest/interceptor/path-interceptor.js';

export const createFilterContainer = () => {
  const container = new Container();

  container.bind<ExceptionFilter>(Component.AppExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(DeffaultAuthExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpExceptionFilter).inSingletonScope();
  container.bind<PathInterceptor>(Component.PathInterceptor).to(PathInterceptor).inSingletonScope();

  return container;
};
