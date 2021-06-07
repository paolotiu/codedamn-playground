import { createApolloServer } from '@utils/createApolloServer';
import { createTestClient } from 'apollo-server-integration-testing';

export const createApolloTestClient = () => {
  const apolloServer = createApolloServer();
  const { mutate, query, setOptions } = createTestClient({
    apolloServer,
  });

  // default client options
  setOptions({
    request: {
      session: { userId: undefined },
    },
  });

  return { mutate, query, setOptions };
};
