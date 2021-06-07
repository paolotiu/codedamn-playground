import { Schema, model, ObjectId, Document } from 'mongoose';
import { IFileDoc } from './File';
import { InterfaceSchema } from './utilTypes';

export interface IPlayground {
  name: string;
  files: IFileDoc[] | ObjectId[];
}

export interface IPlaygroundDoc extends IPlayground, Document {
  id: string;
}

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
};

const PlaygroundSchema = new Schema<IPlaygroundDoc>(PlaygroundSchemaFields);

export default model<IPlaygroundDoc>('Playground', PlaygroundSchema);
