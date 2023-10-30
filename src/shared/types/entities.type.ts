import { City, Good, Type } from './index.js';

export type User = {
  name: string;
  email: string;
  avatar: string;
  isPro: boolean;
}

export type Comment = {
  comment: string;
  date: string | Date;
  rating: number;
  author: User;
}

export type Rent = {
  title: string;
  description: string;
  date: string | Date;
  city: City;
  preview: string;
  images: string[];
  isPremium: boolean;
  type: Type;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Good[];
  author: User;
  comments: Omit<Comment, 'author'>[];
  location: {
    latitude: number;
    longitude: number;
  },
}
