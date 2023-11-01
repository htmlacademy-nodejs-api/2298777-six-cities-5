import { User } from '../../types/index.js';
import { LoginDto, UserEntity } from '../user/index.js';

export interface AuthService {
  authenticate(user: User): Promise<string>;
  verify(login: LoginDto): Promise<UserEntity>;
}
