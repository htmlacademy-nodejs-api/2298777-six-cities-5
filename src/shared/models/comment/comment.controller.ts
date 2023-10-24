import { inject, injectable } from 'inversify';
import { AbstractController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { Request, Response } from 'express';

@injectable()
export class CommentController extends AbstractController {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    super(logger);

    logger.info('Registering routes for comment');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.get});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public get(req: Request, res: Response): void {

  }

  public create(req: Request, res: Response): void {

  }
}
