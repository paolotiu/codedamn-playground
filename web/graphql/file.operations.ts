import { gql } from 'graphql-request';

export const USER_FILES_QUERY = gql`
  query files {
    me {
      files {
        id
        name
        value
        mimeType
      }
    }
  }
`;
