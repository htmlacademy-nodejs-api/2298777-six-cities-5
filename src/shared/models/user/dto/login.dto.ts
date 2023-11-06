import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';

export class LoginDto {
  @IsEmail({}, {message: CreateUserMessages.email.isEmail})
  public email: string;

  @MinLength(6, {message: CreateUserMessages.password.minLength})
  @MaxLength(12, {message: CreateUserMessages.password.maxLength})
  public password: string;
}
