import File from '@models/File';
import mime from 'mime-types';
import { Resolvers } from '../types';

export const fileResolvers: Resolvers = {
  Mutation: {
    createFile: async (_, { name }) => {
      const mimeType = mime.lookup(name);
      const file = new File({
        name,
        mimeType,
      });
      return file;
    },
  },
};
