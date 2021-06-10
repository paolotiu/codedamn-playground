import { AuthError, NotFoundByIdError } from '@graphql/customErrors';
import File from '@models/File';
import Playground from '@models/Playground';
import { Resolvers } from '../types';

export const fileResolvers: Resolvers = {
  User: {
    files: async (parent) => File.find({ user: parent.id }),
  },
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

      await Playground.updateOne(
        { _id: file.playground },
        { updatedAt: new Date() }
      );

      return file.save();
    },
  },
};
