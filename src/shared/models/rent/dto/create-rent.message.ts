export const CreateRentMessage = {
  title: {
    minLength: 'Min title length is 10',
    maxLength: 'Max title length is 100',
  },
  description: {
    minLength: 'Min description length is 20',
    maxLength: 'Max description length is 1024',
  },
  city: {
    isEnum: 'City is invalid',
  },
  preview: {
    isString: 'Preview must be a string',
  },
  images: {
    isString: 'Images must be a string',
  },
  isPremium: {
    isBoolean: 'isPremium must be a boolean',
  },
  type: {
    isEnum: 'Type is invalid',
  },
  bedrooms: {
    min: 'Min bedrooms is 1',
    max: 'Max bedrooms is 8',
  },
  maxAdults: {
    min: 'Min maxAdults is 1',
    max: 'Max maxAdults is 10',
  },
  price: {
    min: 'Min price is 100',
    max: 'Max price is 100000',
  },
  goods: {
    isEnum: 'Goods is invalid',
  },
  userId: {
    isMongoId: 'UserId is invalid',
  },
  location: {
    isObject: 'Location must be an object',
  },
} as const;
