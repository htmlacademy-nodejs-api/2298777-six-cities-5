import { MinLength, MaxLength, IsString, IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';

export class UpdateUserDto {
  @MinLength(1, {message: CreateUserMessages.name.minLength})
  @MaxLength(15, {message: CreateUserMessages.name.maxLength})
  @IsOptional()
  public name?: string;

  @IsOptional()
  @IsString({message: CreateUserMessages.avatar.isString})
  public avatar?: string;

  @IsOptional()
  @IsBoolean({message: CreateUserMessages.isPro.isBoolean})
  public isPro?: boolean;

  @IsOptional()
  @IsMongoId({each: true, message: CreateUserMessages.favoriteRentsIds.isMongoId})
  public favoriteRentsIds?: string[];
}
