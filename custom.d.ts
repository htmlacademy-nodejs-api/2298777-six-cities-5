import { TokenPayload } from './src/shared/models/auth/types/token-payload.type';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayload;
  }
}
