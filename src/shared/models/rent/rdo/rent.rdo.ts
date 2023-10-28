import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/index.js';
import { CommentRdo } from '../../comment/index.js';

export class RentRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose({name: 'createdAt'})
  public date: Date;

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

  @Expose({name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  public commentsCount: number;

  @Expose()
  public location: {
    latitude: number;
    longitude: number;
  };

  @Expose({name: 'comments'})
  @Type(() => CommentRdo)
  public comments: CommentRdo[];
}
