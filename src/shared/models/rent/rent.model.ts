import { Document, Schema, model } from 'mongoose';
import { Rent } from '../../types/index.js';
import { userSchema } from '../user/index.js';

export interface RentDocument extends Rent, Document {
  createdAt: Date,
  updatedAt: Date,
}

const rentSchema = new Schema<RentDocument>({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  date: {
    type: String || Date,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
    minlength: 1,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  type: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  maxAdults: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  goods: [String],
  author: {
    type: userSchema,
    required: true,
  },
  location: {
    type: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    required: true,
  }
}, {timestamps: true});

export const RentModel = model<RentDocument>('Rent', rentSchema);
