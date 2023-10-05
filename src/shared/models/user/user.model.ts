import { Document, Schema, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {}

export const userSchema = new Schema<UserDocument>({
  name: String,
  email: String,
  avatar: String,
  password: String,
  isPro: Boolean,
});

export const UserModel = model<UserDocument>('User', userSchema);
