import { LoginDto, UserEntity } from '../user/index.js';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>;
  verify(login: LoginDto): Promise<UserEntity>;
}
