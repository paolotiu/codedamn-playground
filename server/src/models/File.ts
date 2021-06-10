import { Schema, model, Document, ObjectId, LeanDocument } from 'mongoose';
import { IPlaygroundDoc } from './Playground';
import { IUserDoc } from './User';
import { InterfaceSchema } from './utilTypes';
import mime from 'mime-types';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

export interface IFile {
  value: string;
  mimeType: string;
  name: string;
  user: ObjectId | string | IUserDoc;
  playground: ObjectId | string | IPlaygroundDoc;
}

export interface IFileDoc extends IFile, Document {
  id: string;
}

export interface LeanIFileDoc extends LeanDocument<IFileDoc> {}

const FileSchemaFields: Omit<InterfaceSchema<IFile>, 'mimeType'> = {
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  playground: {
    type: Schema.Types.ObjectId,
    ref: 'Playground',
    required: true,
  },
};

const FileSchema = new Schema(FileSchemaFields);

// mimeType virtual
FileSchema.virtual('mimeType').get(function (this: IFileDoc) {
  return mime.lookup(this.name);
});

// Enable the options to add virtuals in lean queries
FileSchema.plugin(mongooseLeanVirtuals);

// Create a compound index for name uniqueness per user per playground
FileSchema.index({ name: 1, user: 1, playground: 1 }, { unique: true });

export default model<IFileDoc>('File', FileSchema);
