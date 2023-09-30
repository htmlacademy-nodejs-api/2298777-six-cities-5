import { resolve } from 'node:path';
import { Logger } from './index.js';
import { injectable } from 'inversify';
import { pino, Logger as PinoInstance, transport } from 'pino';
import { getProjectDirectory } from '../../helpers/index.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const fileTarget = resolve(getProjectDirectory(), './logs/logs.log');

    this.logger = pino({}, transport({
      targets: [
        {target: 'pino/file', options: { destination: fileTarget, mkdir: true}, level: 'debug'},
        {target: 'pino/file', options: {}, level: 'info'}
      ]
    }));
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info({}, message, args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn({}, message, args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug({}, message, args);
  }
}
