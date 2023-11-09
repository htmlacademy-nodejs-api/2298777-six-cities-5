import { IsBoolean, IsEnum, IsObject, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { City, Good, Type } from '../../../types/entities.enum.js';
import { CreateRentMessage } from './create-rent.message.js';
import { RentDtoConst } from './rent-dto.const.js';

export class UpdateRentDto {
  @MinLength(RentDtoConst.MinLengthTitle, {message: CreateRentMessage.title.minLength})
  @MaxLength(RentDtoConst.MaxLengthTitle, {message: CreateRentMessage.title.maxLength})
  @IsOptional()
  public title?: string;

  @MinLength(RentDtoConst.MinLengthDescription, {message: CreateRentMessage.description.minLength})
  @MaxLength(RentDtoConst.MaxLengthDescription, {message: CreateRentMessage.description.maxLength})
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

  @Min(RentDtoConst.MinBedrooms, {message: CreateRentMessage.bedrooms.min})
  @Max(RentDtoConst.MaxBedrooms, {message: CreateRentMessage.bedrooms.max})
  @IsOptional()
  public bedrooms?: number;

  @Min(RentDtoConst.MinMaxAdults, {message: CreateRentMessage.maxAdults.min})
  @Max(RentDtoConst.MaxMaxAdults, {message: CreateRentMessage.maxAdults.max})
  @IsOptional()
  public maxAdults?: number;

  @Min(RentDtoConst.MinPrice, {message: CreateRentMessage.price.min})
  @Max(RentDtoConst.MaxPrice, {message: CreateRentMessage.price.max})
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
