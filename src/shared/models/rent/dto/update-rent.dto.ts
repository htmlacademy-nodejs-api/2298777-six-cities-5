export class UpdateRentDto {
  title?: string;
  description?: string;
  city?: string;
  preview?: string;
  images?: string[];
  isPremium?: boolean;
  type?: string;
  bedrooms?: number;
  maxAdults?: number;
  price?: number;
  goods?: string[];
  commentsIds?: string[];
  commentsCount?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
}
