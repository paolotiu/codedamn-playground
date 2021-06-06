import { Resolvers } from '@graphql/types';

export const sharedResolvers: Resolvers = {
  Query: {
    ping: () => 'pong',
  },
};
