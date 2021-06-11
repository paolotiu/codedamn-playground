import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';
import http from 'http';
import 'dotenv/config';
import { createApolloServer } from '@utils/createApolloServer';
import { createMongooseConnection } from '@utils/createMongooseConnection';
import File from '@models/File';
import { isValidObjectId } from 'mongoose';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const WEB_URL = process.env.WEB_URL || 'http://localhost:3000';
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
      store: new RedisStore({ client: redisClient }),
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
      const files = await File.find({ playground: id });
      const indexHtml = files.find((file) => file.name === 'index.html');

      return res.send(indexHtml?.value);
    }
    return res.send(id);
  });

  app.use('/:fileName', async (req, res, next) => {
    const { fileName } = req.params;

    if (fileName === 'graphql') return next();
    const dest = req.headers['sec-fetch-dest'];
    const arr = req.headers.referer?.split('/');

    if (!arr) return next();

    const playgroundId = arr[arr.length - 1];
    const file = await File.findOne({
      playground: playgroundId,
      name: fileName,
    });

    if (dest === 'style') {
      // Override default content type
      res.set('Content-Type', 'text/css');
      // Use res.write because res.send overrides out content type header
      res.write(file?.value);
      return res.end();
    }
    res.send(file?.value);
    return;
  });

  const server = createApolloServer();

  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: [WEB_URL, 'https://codedamn-playground.vercel.app'],
    },
  });

  await createMongooseConnection();

  // Alloow subscriptions
  // server.installSubscriptionHandlers(httpServer);
  await new Promise<void>((resolve) => httpServer.listen(4000, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
};

startApolloServer();
