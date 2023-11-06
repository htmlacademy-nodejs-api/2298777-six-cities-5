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
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../libs/rest/middleware/validate-dto.middleware.js';
import { DocumentExistsMidleware } from '../../libs/rest/middleware/document-exists.middleware.js';
import { UploadFileMiddleware } from '../../libs/rest/middleware/upload-file.middleware.js';
import { AuthService } from '../auth/index.js';
import { LoginRdo } from './rdo/login.rdo.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/index.js';

@injectable()
export class UserController extends AbstractController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
  ) {
    super(logger);

    logger.info('Registering routes for users');

    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.auth = this.auth.bind(this);

    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginDto)]
    });
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
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDto),
      ]
    });
    this.addRoute({
      path: '/users/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new UploadFileMiddleware(this.config.get('PUBLIC_DIR'), 'avatar'),
      ]
    });
  }

  public async show({params}: Request<ParamsUserId>, res: Response): Promise<void> {
    const user = await this.userService.findById(params.userId);
    const resData = fillDTO(UserRdo, user);
    this.ok(res, resData);
  }

  public async create({body, tokenPayload}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response): Promise<void> {
    if (tokenPayload) {
      throw new HttpError(StatusCodes.FORBIDDEN, 'Forbidden', 'user controller');
    }
    const user = await this.userService.findByEmail(body.email);
    if (user) {
      throw new HttpError(StatusCodes.CONFLICT, `User with email ${body.email} already exists.`, 'user controller');
    }
    const newUser = await this.userService.create(body, this.config.get('SALT'));
    const token = await this.authService.authenticate(newUser);
    const resData = fillDTO(LoginRdo, {
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.getAvatar(),
      isPro: newUser.isPro,
      token,
    });
    this.created(res, resData);
  }

  public async login({body}: Request<Record<string, unknown>, Record<string, unknown>, LoginDto>, res: Response): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const resData = fillDTO(LoginRdo, {
      name: user.name,
      email: user.email,
      avatar: user.getAvatar(),
      isPro: user.isPro,
      token,
    });
    this.ok(res, resData);
  }

  public async auth({tokenPayload}: Request, res: Response): Promise<void> {
    const user = await this.userService.findByEmail(tokenPayload.email);
    if (!user) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized', 'UserController');
    }
    const resData = fillDTO(UserRdo, user);
    this.ok(res, resData);
  }

  public async uploadAvatar({tokenPayload, file}: Request, res: Response): Promise<void> {
    const user = await this.userService.updateById(tokenPayload.id, {avatar: file?.filename});
    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Unauthorized', 'UserController');
    }
    const resData = fillDTO(UserRdo, user);
    this.created(res, resData);
  }
}
