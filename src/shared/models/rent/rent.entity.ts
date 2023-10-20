import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface RentEntity extends defaultClasses.Base {}

@modelOptions({schemaOptions: {
  collection: 'rents'
}})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class RentEntity extends defaultClasses.TimeStamps {
  @prop({required: true, minlength: 5, maxlength: 100, trim: true})
  public title: string;

  @prop({required: true, minlength: 5, maxlength: 3000, trim: true})
  public description: string;

  @prop({required: true})
  public city: string;

  @prop({required: true})
  public preview: string;

  @prop()
  public images: string[];

  @prop({required: false, default: false})
  public isPremium: boolean;

  @prop({required: false, min: 1, max: 5, default: 1})
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

  @prop({ref: 'UserEntity', required: true})
  public authorId: Ref<'UserEntity'>;

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
    this.authorId = data.authorId;
    this.location = data.location;
  }
}

export const RentModel = getModelForClass(RentEntity);
