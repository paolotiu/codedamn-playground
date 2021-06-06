import { Schema, model, Document, ObjectId } from 'mongoose';
import { IUserDoc } from './User';
import { InterfaceSchema } from './utilTypes';

export interface IFile {
  value: string;
  mimeType: string;
  name: string;
  user: string | ObjectId | IUserDoc;
}

interface IFileDoc extends IFile, Document {}

const FileSchemaFields: InterfaceSchema<IFile> = {
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
};

const FileSchema = new Schema<IFileDoc>(FileSchemaFields);

export default model<IFileDoc>('File', FileSchema);
