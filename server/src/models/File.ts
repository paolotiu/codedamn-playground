import { Schema, model, ObjectId, Document } from 'mongoose';
import { InterfaceSchema } from './utilTypes';

export interface IFile {
  value: string;
  mimeType: string;
  name: string;
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
};

const FileSchema = new Schema<IFileDoc>(FileSchemaFields);

export default model<IFileDoc>('File', FileSchema);
