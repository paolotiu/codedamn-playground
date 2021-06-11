import User from '@models/User';

export const createUser = (name: string) => {
  return new User({
    email: `${name}@test.com`,
    password: 'testPassword',
    name,
  }).save();
};
