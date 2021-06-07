import { Schema, model, ObjectId, Document, LeanDocument } from 'mongoose';
import { IFileDoc } from './File';
import { IUserDoc } from './User';
import { InterfaceSchema } from './utilTypes';

export interface IPlayground {
  name: string;
  files: IFileDoc[] | ObjectId[] | string[];
  user: ObjectId | string | IUserDoc;
}

export interface IPlaygroundDoc extends IPlayground, Document {
  id: string;
}

export interface LeanIPlaygroundDoc extends LeanDocument<IPlaygroundDoc> {}

const PlaygroundSchemaFields: InterfaceSchema<IPlayground> = {
  name: {
    type: String,
    required: true,
  },
  files: [
    {
      type: Schema.Types.ObjectId,
      ref: 'File',
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
};

const PlaygroundSchema = new Schema<IPlaygroundDoc>(PlaygroundSchemaFields);

export default model<IPlaygroundDoc>('Playground', PlaygroundSchema);
