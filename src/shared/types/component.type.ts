import { Config } from 'convict';
import { Logger } from 'pino';
import { RestApplication } from '../../rest/index.js';
import { RestSchema } from '../libs/config/index.js';
import { DbClient } from '../libs/db-client/index.js';
import { UserService, UserModel } from '../models/user/index.js';
import { RentService, RentModel, RentController } from '../models/rent/index.js';
import { CommentController, CommentModel, CommentService } from '../models/comment/index.js';
import { UserController } from '../models/user/user.controller.js';

export type ComponentType = {
  RestApplication: RestApplication,
  Config: Config<RestSchema>,
  Logger: Logger,
  DBCLient: DbClient,
  UserService: UserService,
  UserModel: typeof UserModel,
  RentModel: typeof RentModel,
  RentService: RentService,
  CommentModel: typeof CommentModel,
  CommentService: CommentService,
  CommentController: CommentController,
  RentController: RentController,
  UserController: UserController,
}
