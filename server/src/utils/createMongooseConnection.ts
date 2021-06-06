import mongoose from 'mongoose';

export const createMongooseConnection = (url?: string) => {
  return mongoose.connect(url || (process.env.DB_URL as string), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
