export class CreateRentDto {
  title: string;
  description: string;
  date: Date | string;
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
  authorId: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
