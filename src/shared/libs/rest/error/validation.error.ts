import { StatusCodes } from 'http-status-codes';
import { ValidationErrorType } from '../index.js';
import { HttpError } from './index.js';

export class ValidationError extends HttpError {
  public details: ValidationErrorType[] = [];

  constructor(message: string, errors: ValidationErrorType[]) {
    super(StatusCodes.BAD_REQUEST, message);
    this.details = errors;
  }
}
