import { IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateCommentMessage } from './create-comment.message.js';

export class CreateCommentDto {
  @MinLength(5, {message: CreateCommentMessage.comment.minLength})
  @MaxLength(1024, {message: CreateCommentMessage.comment.maxLength})
  public comment: string;

  @Min(1, {message: CreateCommentMessage.rating.min})
  @Max(5, {message: CreateCommentMessage.rating.max})
  public rating: number;

  @IsMongoId({message: CreateCommentMessage.userId.isMongoId})
  public userId: string;

  public rentId: string;
}
