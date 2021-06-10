import { gql } from 'graphql-request';

export const GET_PLAYGROUND = gql`
  query getPlayground($id: ID!) {
    getPlayground(id: $id) {
      name
      files {
        id
        name
        value
      }
    }
  }
`;

export const GET_ALL_PLAYGROUNDS = gql`
  query getAllPlaygrounds {
    me {
      playgrounds {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_PLAYGROUND = gql`
  mutation updatePlayground($data: UpdatePlaygroundInput!) {
    updatePlayground(data: $data) {
      id
    }
  }
`;

export const CREATE_PLAYGROUND = gql`
  mutation createPlayground($name: String!) {
    createPlayground(name: $name) {
      id
    }
  }
`;
