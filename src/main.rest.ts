import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/component.enum.js';
import { createControllerContainer, createRestContainer, createModelsContainer, createFilterContainer, createMiddlewareContainer } from './rest/container/index.js';

const bootstrap = async () => {
  const container = Container.merge(
    createRestContainer(),
    createModelsContainer(),
    createControllerContainer(),
    createFilterContainer(),
    createMiddlewareContainer(),
  );

  const restApplication = container.get<RestApplication>(Component.RestApplication);
  await restApplication.init();
};

bootstrap();
