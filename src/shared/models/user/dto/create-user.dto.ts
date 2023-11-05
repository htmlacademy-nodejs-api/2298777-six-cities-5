import { IsBoolean, IsEmail, MaxLength, MinLength } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';

export class CreateUserDto {
  @MinLength(1, {message: CreateUserMessages.name.minLength})
  @MaxLength(15, {message: CreateUserMessages.name.maxLength})
  public name: string;

  @IsEmail({}, {message: CreateUserMessages.email.isEmail})
  public email: string;

  @MinLength(6, {message: CreateUserMessages.password.minLength})
  @MaxLength(12, {message: CreateUserMessages.password.maxLength})
  public password: string;

  @IsBoolean({message: CreateUserMessages.isPro.isBoolean})
  public isPro: boolean;
}
