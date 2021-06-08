import { ApolloServer, PubSub } from 'apollo-server-express';
import { schema } from '@graphql/schema';

const pubsub = new PubSub();
export const createApolloServer = () => {
  return new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
      userId: req?.session.userId,
      pubsub,
    }),

    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
  });
};
