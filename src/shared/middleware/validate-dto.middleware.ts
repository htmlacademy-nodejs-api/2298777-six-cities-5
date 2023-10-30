import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware.interface.js';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

export class ValidateDtoMiddleware implements Middleware {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dto = plainToInstance(this.dto, req.body);
    const errors = await validate(dto);

    if (errors.length) {
      res.status(StatusCodes.BAD_REQUEST).send(errors);
      return;
    }

    next();
  }
}
