import {
  File,
  MutationCreateFileArgs,
  MutationLoginArgs,
  MutationRegisterArgs,
  MutationUpdateFileArgs,
} from '@graphql/types';
import {
  CREATE_FILE_MUTATION,
  UPDATE_FILE_MUTATION,
} from '@testUtils/file.operations';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '@testUtils/user.operations';
import { createApolloServer } from '@utils/createApolloServer';
import { createTestClient } from 'apollo-server-integration-testing';

const apolloServer = createApolloServer();
const { mutate, setOptions } = createTestClient({
  apolloServer,
});

// default client options
setOptions({
  request: {
    session: { userId: undefined },
  },
});

const registerMutation = (variables: MutationRegisterArgs) =>
  mutate(REGISTER_MUTATION, { variables });
const loginMutation = (variables: MutationLoginArgs) =>
  mutate<{ login: { user: { email: string; id: string } } }>(LOGIN_MUTATION, {
    variables,
  });

const createFileMutation = (variables: MutationCreateFileArgs) =>
  mutate<{
    createFile: File;
  }>(CREATE_FILE_MUTATION, { variables });

const updateFileMutation = (variables: MutationUpdateFileArgs) =>
  mutate<{ updateFile: File }>(UPDATE_FILE_MUTATION, { variables });

describe('File operations', () => {
  const mockUser = { email: 'test@test.com', password: 'testPassword' };

  it('Login user', async () => {
    await registerMutation(mockUser);
    let { data } = await loginMutation(mockUser);
    if (!data) {
    }
    // Confirm test user logs in
    expect(data?.login.user).not.toBeNull();
  });

  const mockFile: Partial<File> = {
    name: 'index.html',

    mimeType: 'text/html',
  };

  it('Creates file', async () => {
    const { data } = await createFileMutation({ name: mockFile.name || '' });

    // Returns correct name
    expect(data?.createFile.name).toEqual(mockFile.name);

    // Returns correct mimeType
    expect(data?.createFile.mimeType).toEqual(mockFile.mimeType);

    // update mockfile to have id and mimetype
    Object.assign(mockFile, data?.createFile);
  });

  it('Updates the file', async () => {
    const updatedMockFile = {
      name: 'styled.css',

      value: `
            .body {
                color: "red";
            }
          `,
      mimeType: 'text/css',
    };

    const { data } = await updateFileMutation({
      data: {
        id: mockFile.id!,
        name: updatedMockFile.name,
        value: updatedMockFile.value,
      },
    });

    // Updates file fields
    expect(data?.updateFile.name).toEqual(updatedMockFile.name);
    expect(data?.updateFile.value).toEqual(updatedMockFile.value);
    expect(data?.updateFile.mimeType).toEqual(updatedMockFile.mimeType);
  });
});
