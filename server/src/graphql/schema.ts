import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from 'apollo-server-express';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers } from './user/user.resolvers';
import { fileResolvers } from './file/file.resolvers';

const typeDefsArray = loadFilesSync(
  path.join(__dirname, './**/*.typedefs.gql'),
  {
    extensions: ['gql'],
    recursive: true,
  }
);

// Merge
const typeDefs = mergeTypeDefs(typeDefsArray);
const resolvers = mergeResolvers([userResolvers, fileResolvers]);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
