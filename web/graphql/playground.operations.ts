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
      }
    }
  }
`;
