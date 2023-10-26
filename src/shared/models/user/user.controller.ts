import { inject, injectable } from 'inversify';
import { AbstractController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { Request, Response } from 'express';
import { CreateUserDto, UserService } from './index.js';
import { fillDTO } from '../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { Config, RestSchema } from '../../libs/config/index.js';

@injectable()
export class UserController extends AbstractController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
    super(logger);

    logger.info('Registering routes for users');

    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.login = this.login.bind(this);
    this.auth = this.auth.bind(this);

    this.addRoute({path: '/:userId', method: HttpMethod.Get, handler: this.get});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethod.Get, handler: this.login});
    this.addRoute({path: '/login', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({path: '/auth', method: HttpMethod.Get, handler: this.auth});
  }

  public async get({path}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response): Promise<void> {
    const user = await this.userService.findById(path.slice(1));
    if (!user) {
      const error = new Error('User not found');
      this.send(res, StatusCodes.NOT_FOUND, { error: error.message});
      return this.logger.error(error.message, error);
    }
    const resData = fillDTO(UserRdo, user);
    this.ok(res, resData);
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response): Promise<void> {
    const user = await this.userService.findByEmail(body.email);
    if (user) {
      const error = new Error('User already exists');
      this.send(res, StatusCodes.CONFLICT, { error: error.message});
      return this.logger.error(error.message, error);
    }
    const newUser = await this.userService.create(body, this.config.get('SALT'));
    const resData = fillDTO(UserRdo, newUser);
    this.created(res, resData);
  }

  public delete(_req: Request, _res: Response): void {

  }

  public login(_req: Request, _res: Response): void {

  }

  public auth(_req: Request, _res: Response): void {

  }
}
