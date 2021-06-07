import { AuthError } from '@graphql/customErrors';
import { Resolvers } from '@graphql/types';
import { IFileDoc } from '@models/File';
import Playground from '@models/Playground';

export const playgroundResolvers: Resolvers = {
  Playground: {
    files: async (parent) => (areFiles(parent.files) ? parent.files : []),
    id: (parent) => parent._id.toString(),
  },
  Query: {
    getPlayground: async (_, { id }, { userId }) =>
      Playground.findOne({ _id: id, user: userId }).lean(),
  },
  Mutation: {
    createPlayground: (_, { name }, { userId }) => {
      if (!userId) throw new AuthError();
      const playground = new Playground({ name, user: userId });

      return playground.save();
    },
  },
};

function areFiles(arr: unknown): arr is IFileDoc[] {
  if (!arr) return false;

  if (!Array.isArray(arr)) return false;
  if (!arr.length) return false;
  return (arr[0] as IFileDoc).mimeType ? true : false;
}
