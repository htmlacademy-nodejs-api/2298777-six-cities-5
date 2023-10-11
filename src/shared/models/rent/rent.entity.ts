import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { CommentEntity } from '../comment/comment.entity.js';

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

  @prop({ref: UserEntity, required: true})
  public authorId: Ref<UserEntity>;

  @prop({required: true})
  public location: {
    latitude: number;
    longitude: number;
  };

  @prop({required: true, default: [], ref: CommentEntity})
  public commentsIds: Ref<CommentEntity>[];

  @prop({default: 0})
  public commentsCount: number;

  public constructor(data: RentEntity) {
    super();

    this.title = data.title;
    this.description = data.description;
    this.date = data.date;
    this.city = data.city;
    this.preview = data.preview;
    this.images = data.images;
    this.isPremium = data.isPremium;
    this.isFavorite = data.isFavorite;
    this.rating = data.rating;
    this.type = data.type;
    this.bedrooms = data.bedrooms;
    this.maxAdults = data.maxAdults;
    this.goods = data.goods;
    this.authorId = data.authorId;
    this.location = data.location;
    this.commentsIds = data.commentsIds;
  }
}

export const RentModel = getModelForClass(RentEntity);
