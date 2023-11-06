import { Container } from 'inversify';
import { CommentController } from '../../shared/models/comment/index.js';
import { Component } from '../../shared/types/index.js';
import { RentController } from '../../shared/models/rent/index.js';
import { UserController } from '../../shared/models/user/index.js';
import { Controller } from '../../shared/libs/rest/index.js';

export const createControllerContainer = () => {
  const container = new Container();

  container.bind<Controller>(Component.CommentController).to(CommentController).inSingletonScope();
  container.bind<Controller>(Component.RentController).to(RentController).inSingletonScope();
  container.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();

  return container;
};
