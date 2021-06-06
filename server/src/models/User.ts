import { Schema, model, Document } from 'mongoose';
import { InterfaceSchema } from './utilTypes';

interface IUser {
  email: string;
  password: string;
}
export interface IUserDoc extends IUser, Document {}
const UserSchemaFields: InterfaceSchema<IUser> = {
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
};

const UserSchema = new Schema<IUserDoc>(UserSchemaFields);

export default model<IUserDoc>('User', UserSchema);
