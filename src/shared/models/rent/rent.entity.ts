import { Rent, User } from '../../types/index.js';

export class RentEntity implements Rent {
  title: string;
  description: string;
  date: string | Date;
  city: string;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  author: User;
  location: {
    latitude: number;
    longitude: number;
  };
}
