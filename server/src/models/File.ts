import { Schema, model, Document, ObjectId } from 'mongoose';
import { IUserDoc } from './User';
import { InterfaceSchema } from './utilTypes';

export interface IFile {
  value: string;
  mimeType: string;
  name: string;
  user: string | ObjectId | IUserDoc;
}

interface IFileDoc extends IFile, Document {
  id: string;
}

const FileSchemaFields: InterfaceSchema<IFile> = {
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
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

// Create a compound index for name uniqueness per user
FileSchema.index({ name: 1, user: 1 }, { unique: true });

export default model<IFileDoc>('File', FileSchema);
