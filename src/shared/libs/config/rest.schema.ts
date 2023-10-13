import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_RETRY_ATTEMPTS: number;
  DB_RETRY_DELAY: number;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  DB_USERNAME: {
    doc: 'Username to connect to the db',
    format: String,
    env: 'DB_USERNAME',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Password to connect to the db',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Port to connect to the db',
    format: 'port',
    env: 'DB_PORT',
    default: 27017,
  },
  DB_NAME: {
    doc: 'Db name',
    format: String,
    env: 'DB_NAME',
    default: 'six-cities',
  },
  DB_RETRY_ATTEMPTS: {
    doc: 'How many attempts will be made',
    format: Number,
    env: 'DB_RETRY_ATTEMPTS',
    default: 5,
  },
  DB_RETRY_DELAY: {
    doc: 'Delay in milliseconds between connection attempts',
    format: Number,
    env: 'DB_RETRY_DELAY',
    default: 1000,
  }
});
