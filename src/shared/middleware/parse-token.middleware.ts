import { Request, Response, NextFunction } from 'express';
import { Middleware, isTokenPayload } from './index.js';
import { jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';
import { inject, injectable } from 'inversify';
import { Component } from '../types/component.enum.js';
import { Config, RestSchema } from '../libs/config/index.js';
import { HttpError } from '../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class ParseTokenMiddleware implements Middleware {
  constructor(
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return next();
    }

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.config.get('JWT_SECRET'), 'utf-8'));

      if (isTokenPayload(payload)) {
        req.tokenPayload = payload;
        return next();
      }
    } catch (error) {
      return next(new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid token', 'ParseTokenMiddleware'));
    }
  }
}
