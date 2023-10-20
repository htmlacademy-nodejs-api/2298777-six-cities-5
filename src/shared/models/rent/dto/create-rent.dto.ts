export class CreateRentDto {
  title: string;
  description: string;
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
  authorId: string;
  commentsCount: number;
  location: {
    latitude: number;
    longitude: number;
  };
}
