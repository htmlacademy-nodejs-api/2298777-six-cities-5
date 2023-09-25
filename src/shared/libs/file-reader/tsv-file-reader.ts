import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Order } from '../../types/entities.js';
import chalk from 'chalk';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Order[] {
    if (!this.rawData) {
      throw new Error(chalk.red('File was not read'));
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, date, city, preview, images, isPremium, isFavorite, rating, type, bedrooms, maxAdults, price, goods, name, email, avatar, password, isPro, location]) => ({
        title,
        description,
        date: new Date(date),
        city,
        preview,
        images: images.split(' ').map((image) => image),
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: Number.parseInt(rating, 10),
        type,
        bedrooms: parseInt(bedrooms, 10),
        maxAdults: parseInt(maxAdults, 10),
        price: Number.parseInt(price, 10),
        goods: goods.split(' ').map((good) => good),
        author: {
          name,
          email,
          avatar,
          password,
          isPro: isPro === 'true',
        },
        location: {
          latitude: parseFloat(location.split(' ')[0]),
          longitude: parseFloat(location.split(' ')[1]),
        }
      }));
  }
}
