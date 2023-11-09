import { inject, injectable } from 'inversify';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { Config, RestSchema } from '../../config/index.js';
import { DEFAULT_AVATAR, RESOURCE_FIELDS } from '../static.const.js';
import { getFullUrl } from '../../../helpers/index.js';
import { isArray } from 'class-validator';

@injectable()
export class PathInterceptor {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
    this.logger.info('Path interceptor initialized');
  }

  private isStaticProperty(property: string) {
    return RESOURCE_FIELDS.includes(property);
  }

  private iterate(data: Record<string, unknown>): Record<string, unknown> {
    for (const property in data) {
      if (Object.hasOwn(data, property)) {
        const value = data[property];
        if (typeof data[property] === 'object' && !isArray(data[property])) {
          this.iterate(data[property] as Record<string, unknown>);
        } else if (this.isStaticProperty(property) && typeof value === 'string') {
          const path = value === DEFAULT_AVATAR ? this.config.get('STATIC_DIR') : this.config.get('PUBLIC_DIR');
          data[property] = getFullUrl(
            this.config.get('PROTOCOL'),
            this.config.get('HOST'),
            this.config.get('PORT'),
            `${path}/${value}`
          );
        } else if (this.isStaticProperty(property) && isArray(value)) {
          data[property] = value.map((item: string) => {
            const path = item === DEFAULT_AVATAR ? this.config.get('STATIC_DIR') : this.config.get('PUBLIC_DIR');
            return getFullUrl(
              this.config.get('PROTOCOL'),
              this.config.get('HOST'),
              this.config.get('PORT'),
              `${path}/${item}`
            );
          });
        }
      }
    }

    return data;
  }

  public execute(data: Record<string, unknown>): Record<string, unknown> {
    return this.iterate(data);
  }
}
