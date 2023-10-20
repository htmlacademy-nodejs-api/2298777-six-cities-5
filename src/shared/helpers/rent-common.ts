import { getRandomNumber } from './random.js';

export const createRent = (line: string) => {
  const [title, description, date,
    city, preview, images, isPremium,
    type, bedrooms, maxAdults, price, goods,
    name, email, avatar, password, isPro, location, comments] = line.split('\t');


  return {
    title,
    description,
    date: new Date(date),
    city,
    preview,
    images: images.split('@@@').map((image) => image),
    isPremium: isPremium === 'true',
    type,
    bedrooms: parseInt(bedrooms, 10),
    maxAdults: parseInt(maxAdults, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split('@@@').map((good) => good),
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
    },
    comments: comments.trim() === '' ? [] : comments.split('@@@').map((comment) => ({
      comment,
      date: new Date(),
      rating: getRandomNumber(1, 5),
    }))
  };
};
