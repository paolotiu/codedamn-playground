import { AuthError, NotFoundByIdError } from '@graphql/customErrors';
import File from '@models/File';
import { Resolvers } from '../types';

export const fileResolvers: Resolvers = {
  File: {
    id: (parent) => parent._id.toString(),
  },
  Query: {
    getFile: async (_, { id }, { userId }) => {
      if (!userId) throw new AuthError();
      return File.findOne({ _id: id, user: userId }).lean({ virtuals: true });
    },
    // getFileById: async (_, { id }, { userId }) => {
    //   if (!userId) throw new AuthError();
    //   return File.findOne({ _id: id, user: userId });
    // },
  },
  Mutation: {
    createFile: async (_, { name, playgroundId }, { userId }) => {
      if (!userId) throw new AuthError();

      const file = new File({
        name,
        user: userId,
        playground: playgroundId,
      });

      return file.save();
    },
    updateFile: async (_, { data: { id, name, value } }, { userId }) => {
      if (!userId) throw new AuthError();
      const file = await File.findOne({ _id: id, user: userId });
      if (!file) throw new NotFoundByIdError({ item: 'file' });
      if (name) {
        file.name = name;
      }

      if (value) {
        file.value = value;
      }

      return file.save();
    },
  },
};
