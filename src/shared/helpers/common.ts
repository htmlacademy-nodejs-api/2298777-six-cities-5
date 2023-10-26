import { ClassConstructor, plainToInstance } from 'class-transformer';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : '';

export const getProjectDirectory = () =>
  resolve(dirname(fileURLToPath(import.meta.url)), '../../../');

export const fillDTO = <T, V>(dto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(dto, plainObject, {excludeExtraneousValues: true});
