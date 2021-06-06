import { createTestClient } from 'apollo-server-integration-testing';
import { createApolloServer } from '@utils/createApolloServer';
import mongoose from 'mongoose';
import { loginMutation } from '@graphql/user/user.test';

test('1 + 1', async () => {
  expect(1 + 1).toBe(2);
});
