import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from 'apollo-server-express';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers } from './user/user.resolvers';
import { fileResolvers } from './file/file.resolvers';
import { sharedResolvers } from './shared/shared.resolvers';
import { playgroundResolvers } from './playground/playground.resolvers';

const typeDefsArray = loadFilesSync(
  path.join(__dirname, './**/*.typedefs.gql'),
  {
    extensions: ['gql'],
    recursive: true,
  }
);

// Merge
const typeDefs = mergeTypeDefs(typeDefsArray);
const resolvers = mergeResolvers([
  userResolvers,
  fileResolvers,
  sharedResolvers,
  playgroundResolvers,
]);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
