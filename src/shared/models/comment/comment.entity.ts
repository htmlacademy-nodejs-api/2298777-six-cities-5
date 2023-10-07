import { Comment, User } from '../../types/index.js';
import { prop, getModelForClass, defaultClasses, modelOptions } from '@typegoose/typegoose';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps implements Comment {
  @prop({required: true, minlength: 5})
  public comment: string;

  @prop({required: false, default: new Date()})
  public date: string | Date;

  @prop({required: true, min: 1, max: 5})
  public rating: number;

  @prop({required: true})
  public author: User;
}

export const CommentModel = getModelForClass(CommentEntity);
