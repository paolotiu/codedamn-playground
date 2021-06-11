import { gql } from 'graphql-request';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
      }

      errors {
        message
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  query getUser {
    me {
      id
      name
      email
    }
  }
`;
