import { RentGenerator } from './rent-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { getRandomNumber, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { getRandomDate } from '../../helpers/random.js';

export class TSVRentGenerator implements RentGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const rentData = this.mockData;
    const title = getRandomItem(rentData.titles);
    const description = getRandomItem(rentData.descriptions);
    const date = getRandomDate(new Date(2020), new Date());
    const city = getRandomItem(rentData.cities);
    const preview = getRandomItem(rentData.images);
    const images = getRandomItems(rentData.images).join('@@@');
    const isPremium = Math.random() < 0.5;
    const type = getRandomItem(rentData.types);
    const bedrooms = getRandomNumber(1, 8);
    const maxAdults = getRandomNumber(1, 10);
    const price = getRandomNumber(100, 5000);
    const goods = getRandomItems(rentData.goods).join('@@@');
    const name = getRandomItem(rentData.authors.names);
    const email = getRandomItem(rentData.authors.emails);
    const avatar = getRandomItem(rentData.authors.avatars);
    const password = getRandomItem(rentData.authors.passwords);
    const isPro = Math.random() < 0.5;
    const location = getRandomItem(rentData.locations);
    const comments = getRandomItems(rentData.comments).join('@@@');


    return [title, description, date, city,
      preview, images, isPremium,
      type, bedrooms, maxAdults, price, goods,
      name, email, avatar, password, isPro, location, comments]
      .join('\t');
  }
}
