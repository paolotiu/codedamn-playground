import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type File {
    name: String!
    value: String!
    mimeType: String!
  }

  type Query {
    ping: String!
  }

  type Mutation {
    test: String
    createFile(name: String!): File!
  }
`;
