import { Config } from 'convict';
import { Logger } from 'pino';
import { RestApplication } from '../../rest/index.js';
import { RestSchema } from '../libs/config/index.js';
import { DbClient } from '../libs/db-client/index.js';
import { UserService, UserModel } from '../models/user/index.js';
import { RentService, RentModel } from '../models/rent/index.js';
import { CommentModel, CommentService } from '../models/comment/index.js';

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
}
