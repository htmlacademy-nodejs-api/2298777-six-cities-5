import { inject, injectable } from 'inversify';
import { AbstractController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { Request, Response } from 'express';

@injectable()
export class CommentController extends AbstractController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
  ) {
    super(logger);

    logger.info('Registering routes for comment');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.get});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public get(_req: Request, _res: Response): void {

  }

  public create(_req: Request, _res: Response): void {

  }
}
