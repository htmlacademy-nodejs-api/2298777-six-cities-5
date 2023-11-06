import { IsBoolean, IsEnum, IsObject, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { City, Good, Type } from '../../../types/entities.enum.js';
import { CreateRentMessage } from './create-rent.message.js';

export class UpdateRentDto {
  @MinLength(10, {message: CreateRentMessage.title.minLength})
  @MaxLength(100, {message: CreateRentMessage.title.maxLength})
  @IsOptional()
  public title?: string;

  @MinLength(20, {message: CreateRentMessage.description.minLength})
  @MaxLength(1024, {message: CreateRentMessage.description.maxLength})
  @IsOptional()
  public description?: string;

  @IsEnum(City, {message: CreateRentMessage.city.isEnum})
  @IsOptional()
  public city?: City;

  @IsString({message: CreateRentMessage.preview.isString})
  @IsOptional()
  public preview?: string;

  @IsString({each: true, message: CreateRentMessage.images.isString})
  @IsOptional()
  public images?: string[];

  @IsBoolean({message: CreateRentMessage.isPremium.isBoolean})
  @IsOptional()
  public isPremium?: boolean;

  @IsEnum(Type, {message: CreateRentMessage.type.isEnum})
  @IsOptional()
  public type?: Type;

  @Min(1, {message: CreateRentMessage.bedrooms.min})
  @Max(8, {message: CreateRentMessage.bedrooms.max})
  @IsOptional()
  public bedrooms?: number;

  @Min(1, {message: CreateRentMessage.maxAdults.min})
  @Max(10, {message: CreateRentMessage.maxAdults.max})
  @IsOptional()
  public maxAdults?: number;

  @Min(100, {message: CreateRentMessage.price.min})
  @Max(100000, {message: CreateRentMessage.price.max})
  @IsOptional()
  public price?: number;

  @IsEnum(Good, {each: true, message: CreateRentMessage.goods.isEnum})
  @IsOptional()
  public goods?: Good[];

  @IsObject({message: CreateRentMessage.location.isObject})
  @IsOptional()
  public location?: {
    latitude: number;
    longitude: number;
  };
}
