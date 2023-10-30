import { City } from '../../../types/entities.enum.js';

export type QueryRent = {
  city?: City;
  favorite?: string;
  premium?: string;
};
