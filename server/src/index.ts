import express from 'express';
import session from 'express-session';
import 'dotenv/config';
import { createApolloServer } from '@utils/createApolloServer';
import { createMongooseConnection } from '@utils/createMongooseConnection';

const startApolloServer = async () => {
  const app = express();

  // For now we're using the memory to store the sessions
  // In the future we'll want to use something like Redis to persist users
  // even if the server restarts
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      name: 'sid',
      cookie: {
        httpOnly: true,

        // Https only
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      },
    })
  );

  const server = createApolloServer();

  await server.start();

  server.applyMiddleware({ app });

  await createMongooseConnection();
  await new Promise<void>((resolve) => app.listen(4000, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
};

startApolloServer();
