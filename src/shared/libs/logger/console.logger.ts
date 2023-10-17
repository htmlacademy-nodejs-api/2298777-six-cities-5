import { Logger } from './index.js';
import { getErrorMessage } from '../../helpers/common.js';

export class ConsoleLogger implements Logger {
  public info(message: string, ...args: unknown[]): void {
    console.info(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    console.error(message, ...args);
    console.error(getErrorMessage(error));
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    console.debug(message, ...args);
  }
}
