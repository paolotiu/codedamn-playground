import { Schema, model, ObjectId, Document, LeanDocument } from 'mongoose';
import { IUserDoc } from './User';
import { InterfaceSchema } from './utilTypes';

export interface IPlayground {
  name: string;
  user: ObjectId | string | IUserDoc;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPlaygroundDoc extends IPlayground, Document {
  id: string;
}

export interface LeanIPlaygroundDoc extends LeanDocument<IPlaygroundDoc> {}

const PlaygroundSchemaFields: Omit<
  InterfaceSchema<IPlayground>,
  'createdAt' | 'updatedAt'
> = {
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
};

const PlaygroundSchema = new Schema<IPlaygroundDoc>(PlaygroundSchemaFields, {
  timestamps: true,
});

export default model<IPlaygroundDoc>('Playground', PlaygroundSchema);
