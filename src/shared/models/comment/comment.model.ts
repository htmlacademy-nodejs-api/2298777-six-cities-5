import { Document, Schema, model } from 'mongoose';
import { Comment } from '../../types/index.js';
import { userSchema } from '../user/user.model.js';

export interface CommentDocument extends Comment, Document {}

export const commentSchema = new Schema<CommentDocument>({
  comment: String,
  date: Date || String,
  rating: Number,
  author: userSchema,
});

export const CommentSchema = model<CommentDocument>('Comment', commentSchema);
