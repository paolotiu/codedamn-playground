import { gql } from 'apollo-server-core';

export const CREATE_PLAYGROUND_MUTATION = gql`
  mutation ($name: String!) {
    createPlayground(name: $name) {
      name
      id
    }
  }
`;

export const GET_PLAYGROUND_QUERY = gql`
  query ($id: ID!) {
    getPlayground(id: $id) {
      name
      id
      files {
        name
        id
        value
      }
    }
  }
`;

export const UPDATE_PLAYGROUND_MUTATION = gql`
  mutation ($data: UpdatePlaygroundInput!) {
    updatePlayground(data: $data) {
      name
      id
    }
  }
`;
