import { Resolvers } from '../generated/graphql';
import File from '../models/File';

export const resolvers: Resolvers = {
  Query: {
    ping: () => 'pong',
  },
  Mutation: {
    test: async () => {
      const file = new File({
        name: 'Hey',
      });
      file.mimeType = 'text/html';
      await file.save();
      return 'hey';
    },
  },
};
