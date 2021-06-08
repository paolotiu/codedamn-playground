import { PubSub } from 'apollo-server-express';
import { Request, Response } from 'express';

export interface ApolloContext {
  req: Request;
  res: Response;
  userId?: string;
  pubsub: PubSub;
}
