import { gql } from 'graphql-request';

export const PING = gql`
  query ping {
    ping
  }
`;
