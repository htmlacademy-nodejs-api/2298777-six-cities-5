import { Request, Response, NextFunction } from 'express';
import { Middleware } from './index.js';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../libs/rest/index.js';

export class ValidateObjectIdMiddleware implements Middleware {
  constructor(private param: string) {}

  public execute(req: Request, _res: Response, next: NextFunction): void {
    const objectId = req.params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(StatusCodes.BAD_REQUEST,
      `Invalid objectid: ${objectId}`,
      'ValidateObjectIdMiddleware'
    );
  }
}
