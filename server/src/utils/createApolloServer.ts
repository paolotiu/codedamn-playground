import { ApolloServer } from 'apollo-server-express';
import { schema } from '@graphql/schema';

export const createApolloServer = () => {
  return new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, userId: req.session.userId }),
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
  });
};
