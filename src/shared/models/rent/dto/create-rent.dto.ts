import { IsBoolean, IsEnum, IsMongoId, IsObject, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { City, Good, Type } from '../../../types/index.js';
import { CreateRentMessage } from './create-rent.message.js';

export class CreateRentDto {
  @MinLength(10, {message: CreateRentMessage.title.minLength})
  @MaxLength(100, {message: CreateRentMessage.title.maxLength})
  public title: string;

  @MinLength(20, {message: CreateRentMessage.description.minLength})
  @MaxLength(1024, {message: CreateRentMessage.description.maxLength})
  public description: string;

  @IsEnum(City, {message: CreateRentMessage.city.isEnum})
  public city: City;

  @IsString({message: CreateRentMessage.preview.isString})
  public preview: string;

  @IsString({each: true, message: CreateRentMessage.images.isString})
  public images: string[];

  @IsBoolean({message: CreateRentMessage.isPremium.isBoolean})
  public isPremium: boolean;

  @IsEnum(Type, {message: CreateRentMessage.type.isEnum})
  public type: Type;

  @Min(1, {message: CreateRentMessage.bedrooms.min})
  @Max(8, {message: CreateRentMessage.bedrooms.max})
  public bedrooms: number;

  @Min(1, {message: CreateRentMessage.maxAdults.min})
  @Max(10, {message: CreateRentMessage.maxAdults.max})
  public maxAdults: number;

  @Min(100, {message: CreateRentMessage.price.min})
  @Max(100000, {message: CreateRentMessage.price.max})
  public price: number;

  @IsEnum(Good, {each: true, message: CreateRentMessage.goods.isEnum})
  public goods: Good[];

  @IsMongoId({message: CreateRentMessage.userId.isMongoId})
  public userId: string;

  @IsObject({message: CreateRentMessage.location.isObject})
  public location: {
    latitude: number;
    longitude: number;
  };
}
