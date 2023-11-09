import { IsBoolean, IsEnum, IsObject, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { City, Good, Type } from '../../../types/index.js';
import { CreateRentMessage } from './create-rent.message.js';
import { RentDtoConst } from './rent-dto.const.js';

export class CreateRentDto {
  @MinLength(RentDtoConst.MinLengthTitle, {message: CreateRentMessage.title.minLength})
  @MaxLength(RentDtoConst.MaxLengthTitle, {message: CreateRentMessage.title.maxLength})
  public title: string;

  @MinLength(RentDtoConst.MinLengthDescription, {message: CreateRentMessage.description.minLength})
  @MaxLength(RentDtoConst.MaxLengthDescription, {message: CreateRentMessage.description.maxLength})
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

  @Min(RentDtoConst.MinBedrooms, {message: CreateRentMessage.bedrooms.min})
  @Max(RentDtoConst.MaxBedrooms, {message: CreateRentMessage.bedrooms.max})
  public bedrooms: number;

  @Min(RentDtoConst.MinMaxAdults, {message: CreateRentMessage.maxAdults.min})
  @Max(RentDtoConst.MaxMaxAdults, {message: CreateRentMessage.maxAdults.max})
  public maxAdults: number;

  @Min(RentDtoConst.MinPrice, {message: CreateRentMessage.price.min})
  @Max(RentDtoConst.MaxPrice, {message: CreateRentMessage.price.max})
  public price: number;

  @IsEnum(Good, {each: true, message: CreateRentMessage.goods.isEnum})
  public goods: Good[];

  public userId: string;

  @IsObject({message: CreateRentMessage.location.isObject})
  public location: {
    latitude: number;
    longitude: number;
  };
}
