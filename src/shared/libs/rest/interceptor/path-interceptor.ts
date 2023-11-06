import { inject, injectable } from 'inversify';
import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../logger/logger.interface.js';
import { Config, RestSchema } from '../../config/index.js';
import { DEFAULT_AVATAR, STATIC_RESOURCE_FIELDS } from '../static.const.js';
import { getFullUrl } from '../../../helpers/common.js';

@injectable()
export class PathInterceptor {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
    this.logger.info('Path interceptor initialized');
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  private iterate(data: Record<string, unknown>): Record<string, unknown> {
    for (const property in data) {
      if (Object.hasOwn(data, property)) {
        const value = data[property];
        if (typeof data[property] === 'object') {
          this.iterate(data[property] as Record<string, unknown>);
        } else if (this.isStaticProperty(property) && typeof value === 'string') {
          const path = value === DEFAULT_AVATAR ? this.config.get('STATIC_DIR') : this.config.get('PUBLIC_DIR');
          data[property] = getFullUrl(
            this.config.get('PROTOCOL'),
            this.config.get('HOST'),
            this.config.get('PORT'),
            `${path}/${value}`
          );
        }
      }
    }

    return data;
  }

  public execute(data: Record<string, unknown>): Record<string, unknown> {
    return this.iterate(data);
  }
}
