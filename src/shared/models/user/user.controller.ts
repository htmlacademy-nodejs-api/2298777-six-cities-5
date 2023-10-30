import { inject, injectable } from 'inversify';
import { AbstractController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { Request, Response } from 'express';
import { CreateUserDto, LoginDto, UserService } from './index.js';
import { fillDTO } from '../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { Config, RestSchema } from '../../libs/config/index.js';
import { ParamsUserId } from './index.js';
import { ValidateObjectIdMiddleware } from '../../middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../middleware/validate-dto.middleware.js';
import { DocumentExistsMidleware } from '../../middleware/document-exists.middleware.js';

@injectable()
export class UserController extends AbstractController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
    super(logger);

    logger.info('Registering routes for users');

    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.login = this.login.bind(this);
    this.auth = this.auth.bind(this);

    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginDto)]
    });
    this.addRoute({path: '/login', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({path: '/auth', method: HttpMethod.Get, handler: this.auth});
    this.addRoute({
      path: '/users/:userId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMidleware(userService, 'userId', 'User')
      ]
    });
    this.addRoute({
      path: '/users/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
  }

  public async show({params}: Request<ParamsUserId>, res: Response): Promise<void> {
    const user = await this.userService.findById(params.userId);
    const resData = fillDTO(UserRdo, user);
    this.ok(res, resData);
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response): Promise<void> {
    const user = await this.userService.findByEmail(body.email);
    if (user) {
      throw new HttpError(StatusCodes.CONFLICT, `User with email ${body.email} already exists.`, 'user controller');
    }
    const newUser = await this.userService.create(body, this.config.get('SALT'));
    const resData = fillDTO(UserRdo, newUser);
    this.created(res, resData);
  }

  public async delete(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'user controller');
  }

  public async login({body}: Request<Record<string, unknown>, Record<string, unknown>, LoginDto>, _res: Response): Promise<void> {
    const user = await this.userService.findByEmail(body.email);
    console.log(user);
    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, `User with email ${body.email} not found.`, 'user controller');
    }
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'user controller');
  }

  public async auth({headers}: Request<Record<string, unknown>, Record<string, unknown>>, _res: Response): Promise<void> {
    const token = headers.authorization;
    if (!token) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Token not found.', 'user controller');
    }
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'user controller');
  }
}
