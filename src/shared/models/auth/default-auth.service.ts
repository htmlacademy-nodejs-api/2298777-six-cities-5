import { inject, injectable } from 'inversify';
import { LoginDto, UserEntity, UserService } from '../user/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { createSecretKey } from 'node:crypto';
import { SignJWT } from 'jose';
import { AuthError, AuthService, JWT_ALGORITHM, JWT_EXPIRES_IN, TokenPayload } from './index.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = createSecretKey(jwtSecret, 'utf8');
    const token : TokenPayload = {
      id: user.id,
      email: user.email,
      isPro: user.isPro,
      name: user.name,
    };

    this.logger.info(`Creating token for user ${user.id}`);
    return new SignJWT(token)
      .setExpirationTime(JWT_EXPIRES_IN)
      .setProtectedHeader({alg: JWT_ALGORITHM})
      .setIssuedAt()
      .sign(secretKey);
  }

  public async verify(login: LoginDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(login.email);

    if (!user) {
      throw new AuthError();
    }

    const isPasswordValid = await user.comparePassword(login.password, this.config.get('SALT'));

    if (!isPasswordValid) {
      throw new AuthError();
    }

    return user;
  }
}
