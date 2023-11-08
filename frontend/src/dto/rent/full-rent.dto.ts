import UserDto from '../user/user.dto';
import { City, TypeEnum, Good } from './rent-entities.enum';

export default class FullRentDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public city!: City;

  public preview!: string;

  public images!: string[];

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public type!: TypeEnum;

  public rating!: number;

  public bedrooms!: number;

  public maxAdults!: number;

  public price!: number;

  public goods!: Good[];

  public user!: UserDto;

  public location!: {
    latitude: number;
    longitude: number;
  };

  public commentsCount!: number;
}
