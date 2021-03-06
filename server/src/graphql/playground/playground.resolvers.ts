import { AuthError, NotFoundByIdError } from '@graphql/customErrors';
import { Resolvers } from '@graphql/types';
import File from '@models/File';
import Playground from '@models/Playground';
import { createDefaultFiles } from '@utils/createDefaultFiles';

export const playgroundResolvers: Resolvers = {
  User: {
    playgrounds: async (_, __, { userId }) => Playground.find({ user: userId }),
  },
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
    updatePlayground: async (_, { data: { name, id } }, { userId }) => {
      if (!userId) throw new AuthError();
      const playground = await Playground.findOne({ _id: id, user: userId });
      if (!playground) throw new NotFoundByIdError({ item: 'playground' });

      if (name) {
        playground.name = name;
      }

      return playground.save();
    },
    deletePlayground: async (_, { id }, { userId }) => {
      if (!userId) throw new AuthError();
      const playground = await Playground.findOne({ _id: id, user: userId });
      if (!playground) throw new NotFoundByIdError({ item: 'playground' });

      await playground.remove();
      return playground;
    },
  },
  Subscription: {
    playground: {
      subscribe: (_, __, { pubsub }) =>
        pubsub.asyncIterator(['PLAYGROUND_UPDATED', 'FILE_UPDATED']),
    },
  },
};
