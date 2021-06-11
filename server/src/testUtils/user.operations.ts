import { gql } from 'apollo-server-express';

export const REGISTER_MUTATION = gql`
  mutation registerUser($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      user {
        email
        id
        name
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
        name
      }
      errors {
        message
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logOut {
    logout
  }
`;
