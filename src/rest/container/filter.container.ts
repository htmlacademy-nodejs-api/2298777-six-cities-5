import { Container } from 'inversify';
import { ExceptionFilter } from '../../shared/libs/rest/index.js';
import { Component } from '../../shared/types/component.enum.js';
import { DefaultExceptionFilter } from '../../shared/libs/rest/index.js';

export const createFilterContainer = () => {
  const container = new Container();

  container.bind<ExceptionFilter>(Component.ExceptionFilter).to(DefaultExceptionFilter).inSingletonScope();

  return container;
};
