import { MinLength, MaxLength, IsString, IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';
import { UserDtoConst } from './user-dto.const.js';

export class UpdateUserDto {
  @MinLength(UserDtoConst.MinLengthName, {message: CreateUserMessages.name.minLength})
  @MaxLength(UserDtoConst.MaxLengthName, {message: CreateUserMessages.name.maxLength})
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
