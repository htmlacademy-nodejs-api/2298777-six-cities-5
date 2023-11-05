import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware.interface.js';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from '../index.js';
import { reduceValidation } from '../../../helpers/common.js';

export class ValidateDtoMiddleware implements Middleware {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute({body}: Request, _res: Response, next: NextFunction): Promise<void> {
    const dto = plainToInstance(this.dto, body);
    const errors = await validate(dto);

    if (errors.length) {
      throw new ValidationError('Errors:', reduceValidation(errors));
    }

    next();
  }
}
