import { MutationLoginArgs } from '@graphql/types';
import User from '@models/User';
import { createApolloServer } from '@utils/createApolloServer';
import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-integration-testing';

const apolloServer = createApolloServer();
const { mutate, setOptions } = createTestClient({ apolloServer });

// Default server options
setOptions({
  request: {
    session: {
      userId: undefined,
    },
  },
});

const REGISTER_MUTATION = gql`
  mutation registerUser($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      user {
        email
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation loginUser($email: String!, $password: String!) {
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

export const loginMutation = (variables: MutationLoginArgs) =>
  mutate<{ login: { user: { email: string } | null; errors: any[] } }>(
    LOGIN_MUTATION,
    { variables }
  );

describe('Auth flow', () => {
  const mockUser = { email: 'test@test.com', password: 'testPassword' };
  test('register', async () => {
    await mutate(REGISTER_MUTATION, {
      variables: mockUser,
    });

    const user = await User.findOne({ email: mockUser.email }).lean();
    expect(user).not.toBeNull();
    // user inserted in db
    expect(user?.email).toEqual(mockUser.email);

    // Password hashed
    expect(user?.password).not.toEqual(mockUser.password);
  });

  test('Rejects invalid login', async () => {
    const { data } = await loginMutation({
      email: mockUser.email,
      password: 'notThePassword',
    });
    // Confirmed invalid login
    expect(data?.login.errors.length).toBe(1);
    expect(data?.login.user).toBeNull();
  });

  test('Accepts valid login', async () => {
    const { data } = await loginMutation(mockUser);

    // Confirmed returns user
    expect(data?.login.user?.email).toEqual(mockUser.email);
  });
});
