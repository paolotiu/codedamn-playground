import { Resolvers } from '@graphql/types';
import { dateScalar } from './dateScalar';

export const sharedResolvers: Resolvers = {
  Query: {
    ping: () => 'pong',
  },
  Date: dateScalar,
};
