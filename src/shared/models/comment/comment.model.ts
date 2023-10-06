import { Document, Schema, model } from 'mongoose';
import { Comment } from '../../types/index.js';
import { userSchema } from '../user/index.js';

export interface CommentDocument extends Comment, Document {
  createdAt: Date,
  updatedAt: Date,
}

export const commentSchema = new Schema<CommentDocument>({
  comment: {
    type: String,
    required: true,
    minlength: [5, 'Min length for comment is 5']
  },
  date: {
    type: Date || String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  author: {
    type: userSchema,
    required: true,
  },
}, {timestamps: true});

export const CommentSchema = model<CommentDocument>('Comment', commentSchema);
