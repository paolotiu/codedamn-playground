import { gql } from 'apollo-server-express';

export const REGISTER_MUTATION = gql`
  mutation registerUser($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      user {
        email
        id
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        id
      }
      errors {
        message
      }
    }
  }
`;
