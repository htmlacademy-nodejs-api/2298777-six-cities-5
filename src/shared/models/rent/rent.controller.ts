import { inject, injectable } from 'inversify';
import { AbstractController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { Request, Response } from 'express';

@injectable()
export class RentController extends AbstractController {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    super(logger);

    logger.info('Registering routes for comment');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.getList});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:rentId', method: HttpMethod.Get, handler: this.getDetailed});
    this.addRoute({path: '/:rentId', method: HttpMethod.Patch, handler: this.update});
    this.addRoute({path: '/:rentId', method: HttpMethod.Delete, handler: this.delete});
  }

  public getList(req: Request, res: Response): void {

  }

  public create(req: Request, res: Response): void {

  }

  public getDetailed(req: Request, res: Response): void {

  }

  public update(req: Request, res: Response): void {

  }

  public delete(req: Request, res: Response): void {

  }
}
