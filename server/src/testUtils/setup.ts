import { createMongooseConnection } from '@utils/createMongooseConnection';
import mongoose from 'mongoose';

beforeAll(async () => {
  await createMongooseConnection(global.__MONGO_URI__);

  console.log(mongoose.connection.name);
});
afterAll(async () => {
  await mongoose.connection.close();
});
