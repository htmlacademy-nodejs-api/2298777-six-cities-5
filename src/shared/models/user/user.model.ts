import { Document, model, Schema } from 'mongoose';
import { User } from '../../types/index.js';
export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

export const userSchema = new Schema<UserDocument>({
  name: String,
  email: {
    type: String,
    unique: true,
    match: [/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/,
      'Email is incorrect'],
  },
  avatar: {
    type: String,
    required: false,
    default: 'default.jpg',
  },
  password: {
    type: String,
    minlength: [5, 'Min length for password is 5'],
  },
  isPro: {
    type: Boolean,
    required: false,
    default: false,
  },
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
