import { IsBoolean, IsEmail, MaxLength, MinLength } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';
import { UserDtoConst } from './user-dto.const.js';

export class CreateUserDto {
  @MinLength(UserDtoConst.MinLengthName, {message: CreateUserMessages.name.minLength})
  @MaxLength(UserDtoConst.MaxLengthName, {message: CreateUserMessages.name.maxLength})
  public name: string;

  @IsEmail({}, {message: CreateUserMessages.email.isEmail})
  public email: string;

  @MinLength(UserDtoConst.MaxLengthPassword, {message: CreateUserMessages.password.minLength})
  @MaxLength(UserDtoConst.MinLengthPassword, {message: CreateUserMessages.password.maxLength})
  public password: string;

  public avatar: string;

  @IsBoolean({message: CreateUserMessages.isPro.isBoolean})
  public isPro: boolean;
}
