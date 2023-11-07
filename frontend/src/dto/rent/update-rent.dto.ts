import { City, Good, TypeEnum } from './rent-entities.enum';

export default class UpdateRentDto {
  public title?: string;

  public description?: string;

  public city?: City;

  public preview?: string;

  public images?: string[];

  public isPremium?: boolean;

  public type?: TypeEnum;

  public bedrooms?: number;

  public maxAdults?: number;

  public price?: number;

  public goods?: Good[];

  public location?: {
    latitude: number;
    longitude: number;
  };
}
