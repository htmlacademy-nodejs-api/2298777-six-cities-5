import { Request, Response, NextFunction } from 'express';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { AuthError } from './auth.error.js';

@injectable()
export class DefaultAuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    this.logger.info('Auth exception filter created');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof AuthError)) {
      return next(error);
    }

    this.logger.error(`Auth exception: ${error.message}`, error);
    res.status(error.httpStatusCode).json(
      {
        type: 'Authorization',
        message: error.message,
      }
    );
  }
}
