import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { City, Good, Type } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface RentEntity extends defaultClasses.Base {}

@modelOptions({schemaOptions: {
  collection: 'rents'
}})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class RentEntity extends defaultClasses.TimeStamps {
  @prop({required: true, minlength: 10, maxlength: 100, trim: true})
  public title: string;

  @prop({required: true, minlength: 20, maxlength: 1024, trim: true, select: false})
  public description: string;

  @prop({required: true})
  public city: City;

  @prop({required: true})
  public preview: string;

  @prop({select: false, required: true})
  public images: string[];

  @prop({required: true, default: false})
  public isPremium: boolean;

  @prop({required: true, default: false})
  public isFavorite: boolean;

  @prop({required: false, min: 1, max: 5})
  public rating: number;

  @prop({required: true})
  public type: Type;

  @prop({required: true, min: 1, max: 8, select: false})
  public bedrooms: number;

  @prop({required: true, min: 1, max: 10, select: false})
  public maxAdults: number;

  @prop({required: true, min: 100, max: 100000})
  public price: number;

  @prop({select: false, required: true})
  public goods: Good[];

  @prop({ref: 'UserEntity', required: true, select: false})
  public userId: Ref<'UserEntity'>;

  @prop({required: true})
  public location: {
    latitude: number;
    longitude: number;
  };

  @prop({default: 0, required: false})
  public commentsCount: number;

  public constructor(data: RentEntity) {
    super();

    this.title = data.title;
    this.description = data.description;
    this.city = data.city;
    this.preview = data.preview;
    this.images = data.images;
    this.isPremium = data.isPremium;
    this.type = data.type;
    this.bedrooms = data.bedrooms;
    this.maxAdults = data.maxAdults;
    this.goods = data.goods;
    this.userId = data.userId;
    this.location = data.location;
  }
}

export const RentModel = getModelForClass(RentEntity);
