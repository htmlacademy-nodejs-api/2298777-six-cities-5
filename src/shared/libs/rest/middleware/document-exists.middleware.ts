import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware.interface.js';
import { DocumentExists } from './types/document-exists.interface.js';
import { HttpError } from '../index.js';
import { StatusCodes } from 'http-status-codes';

export class DocumentExistsMidleware implements Middleware {
  constructor(
    private service: DocumentExists,
    private param: string,
    private entity: string,
  ) {}

  public async execute({params}: Request, _res: Response, next: NextFunction): Promise<void> {
    const id = params[this.param];

    const exists = await this.service.exists(id);

    if (!exists) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entity} with id ${id} not found`,
        'documentExistsMiddleware'
      );
    }

    next();
  }
}
