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

export const REGISTER_MUTATION = gql`
mutation register($email: String!, $password: String!, $name: String!){
    register(email: $email, password: $password, name:$name){
        errors{
            message
        }
    }
}
`

export const GET_USER_QUERY = gql`
  query getUser {
    me {
      id
      name
      email
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;
