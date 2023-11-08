import { City, TypeEnum } from './rent-entities.enum';

export default class RentDto {
  public id!: string;

  public title!: string;

  public city!: City;

  public preview!: string;

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public type!: TypeEnum;

  public price!: number;

  public location!: {
    latitude: number;
    longitude: number;
  };
}
