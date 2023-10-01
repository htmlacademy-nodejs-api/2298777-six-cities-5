import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : '';

export const getProjectDirectory = () =>
  resolve(dirname(fileURLToPath(import.meta.url)), '../../../');
