import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../libs/rest/index.js';

export class AuthError extends HttpError {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'invalid credentials');
  }
}
