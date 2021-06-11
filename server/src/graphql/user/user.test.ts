import { MutationLoginArgs } from '@graphql/types';
import User from '@models/User';
import { createApolloTestClient } from '@testUtils/createApolloTestClient';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '@testUtils/user.operations';

const { mutate } = createApolloTestClient();

const loginMutation = (variables: MutationLoginArgs) =>
  mutate<{ login: { user: { email: string } | null; errors: any[] } }>(
    LOGIN_MUTATION,
    { variables }
  );

describe('Auth flow', () => {
  const mockUser = { email: 'user@test.com', password: 'testPassword', name: 'testUser' };
  it('Registers user', async () => {
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

  it('Rejects invalid login', async () => {
    const { data } = await loginMutation({
      email: mockUser.email,
      password: 'notThePassword',
    });
    // Confirmed invalid login
    expect(data?.login.errors.length).toBe(1);
    expect(data?.login.user).toBeNull();
  });

  it('Accepts valid login', async () => {
    const { data } = await loginMutation(mockUser);

    // Confirmed returns user
    expect(data?.login.user?.email).toEqual(mockUser.email);
  });
});
