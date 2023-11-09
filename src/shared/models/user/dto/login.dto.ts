import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';
import { UserDtoConst } from './user-dto.const.js';

export class LoginDto {
  @IsEmail({}, {message: CreateUserMessages.email.isEmail})
  public email: string;

  @MinLength(UserDtoConst.MinLengthPassword, {message: CreateUserMessages.password.minLength})
  @MaxLength(UserDtoConst.MaxLengthPassword, {message: CreateUserMessages.password.maxLength})
  public password: string;
}
