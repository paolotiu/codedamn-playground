import User from '@models/User';
import bcrypt from 'bcryptjs';
import { Resolvers } from '../types';

const invalidLogin = {
  errors: [{ path: 'login', message: 'The email or password is incorrect' }],
};
export const userResolvers: Resolvers = {
  Query: {
    me: async (_, __, { userId }) => {
      const user = await User.findById(userId).lean();
      return user;
    },
  },

  Mutation: {
    register: async (_, { email, password }) => {
      const existingUser = await User.findOne({ email });

      // ---------------------------------------------------
      // We could add validation here prefferably using yup
      // ---------------------------------------------------

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
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ email });
      if (!user) return invalidLogin;

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return invalidLogin;

      // Set the userId in the session object
      req.session.userId = user.id;

      return { user };
    },
  },
};
