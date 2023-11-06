import { prop, getModelForClass, defaultClasses, modelOptions, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { RentEntity } from '../rent/index.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({required: true, minlength: 5, trim: true})
  public comment: string;

  @prop({required: true, min: 1, max: 5})
  public rating: number;

  @prop({required: true, ref: UserEntity})
  public authorId: Ref<UserEntity>;

  @prop({required: true, ref: RentEntity})
  public rentId: Ref<RentEntity>;

  public constructor(data: CommentEntity) {
    super();

    this.comment = data.comment;
    this.rating = data.rating;
    this.authorId = data.authorId;
    this.rentId = data.rentId;
  }
}

export const CommentModel = getModelForClass(CommentEntity);
