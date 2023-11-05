import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ValidationErrorType } from '../libs/rest/types/validation-erorr.type.js';

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : '';

export const getProjectDirectory = () =>
  resolve(dirname(fileURLToPath(import.meta.url)), '../../../');

export const fillDTO = <T, V>(dto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(dto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: Error) => ({
  error: message,
});

export const makeCapitalized = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const reduceValidation = (errors: ValidationError[]) => errors.map(({property, value, constraints}): ValidationErrorType => ({
  property,
  value,
  messages: constraints ? Object.values(constraints) : []
}));
