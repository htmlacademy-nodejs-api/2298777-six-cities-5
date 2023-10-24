import { inject, injectable } from 'inversify';
import { AbstractController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { Request, Response } from 'express';

@injectable()
export class UserController extends AbstractController {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    super(logger);

    logger.info('Registering routes for comment');

    this.addRoute({path: '/:userId', method: HttpMethod.Get, handler: this.get});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethod.Get, handler: this.login});
    this.addRoute({path: '/login', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({path: '/auth', method: HttpMethod.Get, handler: this.auth});
  }

  public get(req: Request, res: Response): void {

  }

  public create(req: Request, res: Response): void {

  }

  public update(req: Request, res: Response): void {

  }

  public delete(req: Request, res: Response): void {

  }

  public login(req: Request, res: Response): void {

  }

  public auth(req: Request, res: Response): void {

  }
}
