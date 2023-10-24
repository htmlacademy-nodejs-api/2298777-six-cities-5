import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
import { createControllerContainer, createRestContainer } from './index.js';
import { ComponentType } from '../../shared/types/component.type.js';

export class MainContainer {
  private container : interfaces.Container;

  constructor() {
    this.container = Container.merge(
      createControllerContainer(),
      createRestContainer(),
      createControllerContainer()
    );
  }

  public get<T extends keyof ComponentType>(key: T): ComponentType[T] {
    return this.container.get(key);
  }
}
