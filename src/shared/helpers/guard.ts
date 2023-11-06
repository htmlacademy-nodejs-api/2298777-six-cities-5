import { City } from '../types/index.js';

export const isCity = (cityName: string): cityName is City =>
  ['paris', 'cologne', 'brussels', 'amsterdam', 'hamburg', 'dusseldorf'].includes(cityName.toLowerCase());
