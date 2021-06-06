import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from '@graphql/schema';
import mongoose from 'mongoose';
import session from 'express-session';
import 'dotenv/config';

const startMongoose = async () => {
  mongoose.connect(process.env.DB_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

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

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, userId: req.session.userId }),
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  await startMongoose();
  await new Promise<void>((resolve) => app.listen(4000, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
};

startApolloServer();
