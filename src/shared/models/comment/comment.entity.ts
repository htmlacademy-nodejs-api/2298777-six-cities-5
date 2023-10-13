import { prop, getModelForClass, defaultClasses, modelOptions, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({required: true, minlength: 5})
  public comment: string;

  @prop({required: false, default: new Date()})
  public date: string | Date;

  @prop({required: true, min: 1, max: 5})
  public rating: number;

  @prop({required: true, ref: UserEntity})
  public authorId: Ref<UserEntity>;

  public constructor(data: CommentEntity) {
    super();

    this.comment = data.comment;
    this.date = data.date;
    this.rating = data.rating;
    this.authorId = data.authorId;
  }
}

export const CommentModel = getModelForClass(CommentEntity);
