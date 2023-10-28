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

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export type City = typeof cities[number];

const type = ['apartment', 'room', 'house', 'hotel'] as const;

export type Type = typeof type[number];

const goods = ['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'] as const;

export type Good = typeof goods[number];
