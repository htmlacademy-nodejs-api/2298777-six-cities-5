import { resolve } from 'node:path';
import { Loger } from './index.js';
import { pino, Logger as PinoInstance, transport } from 'pino';
import { getProjectDirectory } from '../../helpers/index.js';

export class PinoLoger implements Loger {
  private readonly loger: PinoInstance;

  constructor() {
    const fileTarget = resolve(getProjectDirectory(), './logs/logs.log');

    this.loger = pino({}, transport({
      targets: [
        {target: 'pino/file', options: { destination: fileTarget, mkdir: true}, level: 'debug'},
        {target: 'pino/file', options: {}, level: 'info'}
      ]
    }));
  }

  info(message: string, ...args: unknown[]): void {
    this.loger.info({}, message, args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.loger.warn({}, message, args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    this.loger.error(error, message, args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.loger.debug({}, message, args);
  }
}
