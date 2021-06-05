import { Schema, model, ObjectId } from 'mongoose';

export interface IFile {
  id: ObjectId;
  value: string;
  mimeType: string;
  name: string;
}

interface IFileDoc extends IFile, Document {}

const FileSchemaFields: Omit<Record<keyof IFile, any>, 'id'> = {
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

const FileSchema = new Schema<IFile>(FileSchemaFields);

export default model<IFileDoc>('File', FileSchema);
