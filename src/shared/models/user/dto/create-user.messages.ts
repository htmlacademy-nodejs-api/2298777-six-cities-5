export const CreateUserMessages = {
  name: {
    minLength: 'Min name length is 1',
    maxLength: 'Max name length is 15',
  },
  email: {
    isEmail: 'Email is invalid',
  },
  password: {
    minLength: 'Min password length is 6',
    maxLength: 'Max password length is 12',
  },
  isPro: {
    isBoolean: 'isPro must be a boolean',
  },
  avatar: {
    isString: 'avatar must be a string',
  },
  favoriteRentsIds: {
    isMongoId: 'favoriteRentsIds must be a mongo id',
  }
} as const;
