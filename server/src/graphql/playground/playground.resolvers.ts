import { AuthError } from '@graphql/customErrors';
import { Resolvers } from '@graphql/types';
import File, { IFileDoc } from '@models/File';
import Playground from '@models/Playground';
import { createDefaultFiles } from '@utils/createDefaultFiles';

export const playgroundResolvers: Resolvers = {
  Playground: {
    files: async (parent) =>
      // Use _id because id doesnt exists in the POJO
      File.find({ playground: parent._id, user: parent.user }),

    id: (parent) => parent._id.toString(),
  },
  Query: {
    getPlayground: async (_, { id }, { userId }) =>
      Playground.findOne({ _id: id, user: userId }).lean(),
  },
  Mutation: {
    createPlayground: async (_, { name }, { userId }) => {
      if (!userId) throw new AuthError();
      const playground = new Playground({ name, user: userId });
      await playground.save();
      await createDefaultFiles(userId, playground._id);

      return playground;
    },
  },
};
