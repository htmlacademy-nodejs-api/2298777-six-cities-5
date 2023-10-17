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
  city: string;
  preview: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  author: User;
  comments: Omit<Comment, 'author'>[];
  location: {
    latitude: number;
    longitude: number;
  },
}
