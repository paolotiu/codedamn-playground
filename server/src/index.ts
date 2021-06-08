import express from 'express';
import session from 'express-session';
import http from 'http';
import 'dotenv/config';
import { createApolloServer } from '@utils/createApolloServer';
import { createMongooseConnection } from '@utils/createMongooseConnection';
import Playground from '@models/Playground';
import File from '@models/File';
import { isValidObjectId } from 'mongoose';

const startApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

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

  app.get('/playground/:id', async (req, res) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const pg = await Playground.findOne({ _id: id });
      const files = await File.find({ playground: id });
      const indexHtml = files.find((file) => file.name === 'index.html');

      return res.send(indexHtml?.value);
    }
    res.send(id);
  });

  app.use('/', async (req, res, next) => {
    const dest = req.headers['sec-fetch-dest'];
    if (dest !== 'script') return next();

    const split = req.headers.referer?.split('/');
    if (split) {
      const id = split[split?.length - 1];
      const file = await File.findOne({ _id: '60be2b4cfdc1a84d7f23e5e6' });
      console.log(file);
      res.send(file?.value);
      return;
    }
    next();
  });

  const server = createApolloServer();

  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ['http://localhost:3000', 'http://localhost:4000'],
    },
  });

  await createMongooseConnection();

  // Alloow subscriptions
  server.installSubscriptionHandlers(httpServer);

  await new Promise<void>((resolve) => httpServer.listen(4000, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(
    `🚀 Subscriptions ready at http://localhost:4000${server.subscriptionsPath}`
  );
  return { server, app };
};

startApolloServer();
