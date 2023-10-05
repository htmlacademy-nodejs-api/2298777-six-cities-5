import { Document, Schema, model } from 'mongoose';
import { Rent } from '../../types/index.js';
import { userSchema } from '../user/index.js';

export interface RentDocument extends Rent, Document {}

const rentSchema = new Schema<RentDocument>({
  title: String,
  description: String,
  date: String || Date,
  city: String,
  preview: String,
  images: [String],
  isPremium: Boolean,
  isFavorite: Boolean,
  rating: Number,
  type: String,
  bedrooms: Number,
  maxAdults: Number,
  price: Number,
  goods: [String],
  author: userSchema,
  location: {
    latitude: Number,
    longitude: Number,
  }
});

export const RentModel = model<RentDocument>('Rent', rentSchema);
