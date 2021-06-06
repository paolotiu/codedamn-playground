import { AuthError } from '@graphql/customErrors';
import File from '@models/File';
import mime from 'mime-types';
import { Resolvers } from '../types';

export const fileResolvers: Resolvers = {
  Mutation: {
    createFile: async (_, { name }, { userId }) => {
      if (!userId) throw new AuthError();

      const mimeType = mime.lookup(name);
      const file = new File({
        name,
        mimeType,
        user: userId,
      });

      return file.save();
    },
  },
};
