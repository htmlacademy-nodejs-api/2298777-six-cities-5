import { Response, Router } from 'express';
import { Controller } from './index.js';
import { Route } from '../index.js';
import { Logger } from '../../logger/index.js';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import asyncHandler from 'express-async-handler';
import { PathInterceptor } from '../interceptor/path-interceptor.js';
import { Component } from '../../../types/component.enum.js';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class AbstractController implements Controller {
  private readonly _router: Router;

  @inject(Component.PathInterceptor)
  private pathInterceptor: PathInterceptor;

  constructor(
    protected readonly logger: Logger
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route): void {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (item) => asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;
    this._router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered ${route.method} at ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(this.pathInterceptor.execute(data as Record<string, unknown>));
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }
}
