import User from '@models/User';
import bcrypt from 'bcryptjs';
import { Resolvers } from '../types';

export const userResolvers: Resolvers = {
  Mutation: {
    register: async (_, { email, password }) => {
      const existingUser = await User.find({ email });

      // Check if there is existing user with that email
      if (existingUser) {
        return {
          errors: [
            {
              path: 'register',
              message: 'User with that email already exists',
            },
          ],
        };
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await new User({ email, password: hashedPassword }).save();

      return { user };
    },
  },
};
