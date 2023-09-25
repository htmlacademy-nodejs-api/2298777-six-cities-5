export type User = {
  name: string;
  email: string;
  avatar: string;
  password: string;
  isPro: boolean;
}

export type Order = {
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
  }
}

export type Comment = {
  comment: string;
  date: string | Date;
  rating: number;
  author: User;
}
