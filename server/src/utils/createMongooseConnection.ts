import mongoose from 'mongoose';

export const createMongooseConnection = (url?: string) => {
  // Add logs in dev
  if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
  }
  return mongoose.connect(url || (process.env.DB_URL as string), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
