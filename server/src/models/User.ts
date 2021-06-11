import { Schema, model, Document, LeanDocument } from 'mongoose';
import { InterfaceSchema } from './utilTypes';

interface IUser {
  email: string;
  password: string;
  name: string;
}

export interface IUserDoc extends IUser, Document {
  id: string;
}

export interface LeanIUserDoc extends LeanDocument<IUserDoc> {}

const UserSchemaFields: InterfaceSchema<IUser> = {
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
};

const UserSchema = new Schema<IUserDoc>(UserSchemaFields);

export default model<IUserDoc>('User', UserSchema);
