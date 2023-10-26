import { Expose } from 'class-transformer';
import { User } from '../../../types/index.js';

export class RentRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public city: string;

  @Expose()
  public preview: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: string;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: string[];

  @Expose()
  public userId: User;

  @Expose()
  public commentsCount: number;

  @Expose()
  public location: {
    latitude: number;
    longitude: number;
  };
}
