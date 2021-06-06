import { gql } from 'apollo-server-express';

export const CREATE_FILE_MUTATION = gql`
  mutation createFile($name: String!) {
    createFile(name: $name) {
      id
      name
      value
      mimeType
    }
  }
`;

export const UPDATE_FILE_MUTATION = gql`
  mutation updateFile($data: UpdateFileInput!) {
    updateFile(data: $data) {
      id
      name
      value
      mimeType
    }
  }
`;
