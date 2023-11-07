import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { createErrorObject } from '../../../helpers/common.js';
import { Component } from '../../../types/component.enum.js';
import { HttpError } from '../index.js';
import { ExceptionFilter } from './exception-filter.interface.js';
import { Logger } from '../../logger/index.js';
import { AppError } from '../types/app-error.enum.js';

@injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    res
      .status(error.httpStatusCode)
      .json(createErrorObject(AppError.CommonError, error.message));
  }
}
