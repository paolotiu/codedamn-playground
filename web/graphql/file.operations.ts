import { gql } from 'graphql-request';

export const USER_FILES_QUERY = gql`
  query files {
    me {
      files {
        id
        name
        value
      }
    }
  }
`;

export const UPDATE_FILE_MUTATION = gql`
  mutation updateFile($data: UpdateFileInput!) {
    updateFile(data: $data) {
      id
    }
  }
`;
