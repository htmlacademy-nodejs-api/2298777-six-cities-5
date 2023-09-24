export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export const getRandomItem = <T>(items: T[]): T => items[getRandomNumber(0, items.length - 1)];

export const getRandomItems = <T>(items: T[]): T[] => {
  const startPosition = getRandomNumber(0, items.length - 1);
  const endPosition = getRandomNumber(startPosition, items.length - 1);
  return items.slice(startPosition, endPosition);
};

export const getRandomDate = (start: Date, end: Date) =>
  new Date(start.getDate() + Math.random() * (end.getDate() - start.getDate()));
