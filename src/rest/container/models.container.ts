import { Container } from 'inversify';
import { UserModel, UserService } from '../../shared/models/user/index.js';
import { Component } from '../../shared/types/index.js';
import { DefaultUserService } from '../../shared/models/user/index.js';
import { RentService } from '../../shared/models/rent/index.js';
import { DefaultRentService } from '../../shared/models/rent/index.js';
import { RentModel } from '../../shared/models/rent/index.js';
import { CommentModel, CommentService, DefaultCommentService } from '../../shared/models/comment/index.js';
import { AuthService, DefaultAuthService } from '../../shared/models/auth/index.js';

export const createModelsContainer = () => {
  const container = new Container();

  container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  container.bind<typeof UserModel>(Component.UserModel).toConstantValue(UserModel);
  container.bind<RentService>(Component.RentService).to(DefaultRentService).inSingletonScope();
  container.bind<typeof RentModel>(Component.RentModel).toConstantValue(RentModel);
  container.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  container.bind<typeof CommentModel>(Component.CommentModel).toConstantValue(CommentModel);
  container.bind<AuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();

  return container;
};
