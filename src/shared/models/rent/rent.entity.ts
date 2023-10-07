import { Rent, User } from '../../types/index.js';
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface RentEntity extends defaultClasses.Base {}

@modelOptions({schemaOptions: {
  collection: 'rents'
}})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class RentEntity extends defaultClasses.TimeStamps implements Rent {
  @prop({required: true, minlength: 5, maxlength: 100})
  public title: string;

  @prop({required: true, minlength: 5, maxlength: 3000})
  public description: string;

  @prop({required: false, default: new Date()})
  public date: string | Date;

  @prop({required: true})
  public city: string;

  @prop({required: true})
  public preview: string;

  @prop()
  public images: string[];

  @prop({required: false, default: false})
  public isPremium: boolean;

  @prop({required: false, default: false})
  public isFavorite: boolean;

  @prop({required: true, min: 1, max: 5})
  public rating: number;

  @prop({required: true})
  public type: string;

  @prop({required: true, min: 1, max: 10})
  public bedrooms: number;

  @prop({required: true, min: 1, max: 20})
  public maxAdults: number;

  @prop({required: true, min: 1, max: 20000})
  public price: number;

  @prop()
  public goods: string[];

  @prop({required: true})
  public author: User;

  @prop({required: true})
  public location: {
    latitude: number;
    longitude: number;
  };
}

export const RentModel = getModelForClass(RentEntity);
