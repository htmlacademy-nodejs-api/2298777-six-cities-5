export const createRent = (line: string) => {
  const [title, description, date,
    city, preview, images, isPremium, isFavorite,
    rating, type, bedrooms, maxAdults, price, goods,
    name, email, avatar, password, isPro, location] = line.split('\t');


  return {
    title,
    description,
    date: new Date(date),
    city,
    preview,
    images: images.split('@@@').map((image) => image),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number.parseInt(rating, 10),
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
    }
  };
};
