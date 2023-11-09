import { Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateCommentMessage } from './create-comment.message.js';
import { CommentDtoConst } from './comment-dto.const.js';

export class CreateCommentDto {
  @MinLength(CommentDtoConst.MinLengthComment, {message: CreateCommentMessage.comment.minLength})
  @MaxLength(CommentDtoConst.MaxLengthComment, {message: CreateCommentMessage.comment.maxLength})
  public comment: string;

  @Min(CommentDtoConst.MinRating, {message: CreateCommentMessage.rating.min})
  @Max(CommentDtoConst.MaxRating, {message: CreateCommentMessage.rating.max})
  public rating: number;

  public userId: string;

  public rentId: string;
}
