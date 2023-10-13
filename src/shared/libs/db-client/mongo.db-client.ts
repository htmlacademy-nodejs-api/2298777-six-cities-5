import { inject, injectable } from 'inversify';
import * as Mongoose from 'mongoose';
import { DbClient } from './index.js';
import { Logger } from '../logger/index.js';
import { Component } from '../../types/index.js';
import { Config, RestSchema } from '../config/index.js';
import { retryAsync } from 'ts-retry';

@injectable()
export class MongoDBClient implements DbClient {
  private mongoose : typeof Mongoose;
  private _isConnected = false;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  private get isConnected() {
    return this._isConnected;
  }

  private set isConnected(value: boolean) {
    this._isConnected = value;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to database');


    this.mongoose = await retryAsync(async () => Mongoose.connect(uri), {
      maxTry: this.config.get('DB_RETRY_ATTEMPTS'),
      onError: (err) => this.logger.error('Failed connecting to db', err as Error),
      delay: this.config.get('DB_RETRY_DELAY'),
    });

    this.isConnected = true;

    this.logger.info('Connection to database established');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
