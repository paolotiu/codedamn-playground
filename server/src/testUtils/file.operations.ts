import { gql } from 'apollo-server-express';

export const CREATE_FILE_MUTATION = gql`
  mutation createFile($name: String!, $playgroundId: String!) {
    createFile(name: $name, playgroundId: $playgroundId) {
      id
      name
      value
    }
  }
`;

export const GET_FILE_QUERY = gql`
  query getFile($id: ID!) {
    getFile(id: $id) {
      id
      name
      value
    }
  }
`;

export const UPDATE_FILE_MUTATION = gql`
  mutation updateFile($data: UpdateFileInput!) {
    updateFile(data: $data) {
      id
      name
      value
    }
  }
`;
