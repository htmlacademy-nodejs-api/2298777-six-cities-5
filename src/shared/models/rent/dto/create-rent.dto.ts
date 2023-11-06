export class CreateRentDto {
  title: string;
  description: string;
  city: string;
  preview: string;
  images: string[];
  isPremium: boolean;
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
