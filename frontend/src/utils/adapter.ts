import { UserType } from '../const';
import CommentDto from '../dto/comment/comment.dto';
import CreateRentDto from '../dto/rent/create-rent.dto';
import FullRentDto from '../dto/rent/full-rent.dto';
import { City, Good, TypeEnum } from '../dto/rent/rent-entities.enum';
import RentDto from '../dto/rent/rent.dto';
import UpdateRentDto from '../dto/rent/update-rent.dto';
import { CityName, Comment, NewOffer, Offer, Type } from '../types/types';

const CitiesLocations = {
  Paris: {
    latitude: 48.864716,
    longitude: 2.349014,
  },
  Cologne: {
    latitude: 50.935173,
    longitude: 6.953101,
  },
  Brussels: {
    latitude: 50.85045,
    longitude: 4.34878,
  },
  Amsterdam: {
    latitude: 52.377956,
    longitude: 4.897070,
  },
  Hamburg: {
    latitude: 53.551086,
    longitude: 9.993682,
  },
  Dusseldorf: {
    latitude: 51.233334,
    longitude: 6.783333,
  },
} as const;

export const adaptRentsToClient = (rents: RentDto[]): Offer[] =>
  rents.map((rent) => adaptRentToClient(rent));

export const adaptRentToClient = (rent: RentDto): Offer => ({
  title: rent.title,
  description: '',
  city: {
    name: rent.city as CityName,
    location: {
      latitude: CitiesLocations[rent.city].latitude,
      longitude: CitiesLocations[rent.city].longitude,
    }
  },
  previewImage: rent.preview,
  images: [],
  isPremium: rent.isPremium,
  isFavorite: rent.isFavorite,
  type: rent.type as Type,
  rating: rent.rating,
  bedrooms: 0,
  maxAdults: 0,
  price: rent.price,
  goods: [],
  host: {
    name: '',
    avatarUrl: '',
    type: 'regular' as UserType,
    email: '',
  },
  id: rent.id,
  location: {
    latitude: rent.location.latitude,
    longitude: rent.location.longitude,
  },
});

export const adaptFullRentToClient = (rent: FullRentDto): Offer => ({
  title: rent.title,
  description: rent.description,
  city: {
    name: rent.city as CityName,
    location: {
      latitude: CitiesLocations[rent.city].latitude,
      longitude: CitiesLocations[rent.city].longitude,
    }
  },
  previewImage: rent.preview,
  images: rent.images,
  isPremium: rent.isPremium,
  isFavorite: rent.isFavorite,
  type: rent.type as Type,
  rating: rent.rating,
  bedrooms: rent.bedrooms,
  maxAdults: rent.maxAdults,
  price: rent.price,
  goods: rent.goods,
  host: {
    name: rent.user.name,
    avatarUrl: rent.user.avatar,
    type: (rent.user.isPro ? 'pro' : 'regular') as UserType,
    email: rent.user.email,
  },
  id: rent.id,
  location: {
    latitude: rent.location.latitude,
    longitude: rent.location.longitude,
  },
});

export const adaptClientToCreateRent = (rent: NewOffer): CreateRentDto => ({
  title: rent.title,
  description: rent.description,
  city: rent.city.name as City,
  preview: rent.previewImage,
  images: rent.images,
  isPremium: rent.isPremium,
  type: rent.type as TypeEnum,
  bedrooms: rent.bedrooms,
  maxAdults: rent.maxAdults,
  price: rent.price,
  goods: rent.goods as Good[],
  location: {
    latitude: rent.location.latitude,
    longitude: rent.location.longitude,
  },
});

export const adaptClientToUpdatedRent = (rent: Offer): UpdateRentDto => ({
  title: rent.title,
  description: rent.description,
  city: rent.city.name as City,
  preview: rent.previewImage,
  images: rent.images,
  isPremium: rent.isPremium,
  type: rent.type as TypeEnum,
  bedrooms: rent.bedrooms,
  maxAdults: rent.maxAdults,
  price: rent.price,
  goods: rent.goods as Good[],
  location: {
    latitude: rent.location.latitude,
    longitude: rent.location.longitude,
  },
});

export const adaptCommentsToClient = (comments: CommentDto[]): Comment[] => comments.map((comment) =>
  adaptCommentToClient(comment)
);

export const adaptCommentToClient = (comment: CommentDto): Comment => ({
  id: comment.id,
  user: {
    type: (comment.user.isPro ? 'pro' : 'regular') as UserType,
    name: comment.user.name,
    avatarUrl: comment.user.avatar,
    email: comment.user.email,
  },
  rating: comment.rating,
  comment: comment.comment,
  date: comment.date,
});
