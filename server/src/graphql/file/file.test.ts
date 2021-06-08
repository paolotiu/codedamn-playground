import {
  File,
  MutationCreateFileArgs,
  MutationLoginArgs,
  MutationRegisterArgs,
  MutationUpdateFileArgs,
  QueryGetFileArgs,
} from '@graphql/types';
import Playground from '@models/Playground';
import { createApolloTestClient } from '@testUtils/createApolloTestClient';
import {
  CREATE_FILE_MUTATION,
  GET_FILE_QUERY,
  UPDATE_FILE_MUTATION,
} from '@testUtils/file.operations';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '@testUtils/user.operations';

const { mutate, query } = createApolloTestClient();

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

const getFileQuery = (variables: QueryGetFileArgs) =>
  query<{ getFile: File }>(GET_FILE_QUERY, { variables });

const updateFileMutation = (variables: MutationUpdateFileArgs) =>
  mutate<{ updateFile: File }>(UPDATE_FILE_MUTATION, { variables });

describe('File operations', () => {
  const mockUser = { email: 'file@test.com', password: 'testPassword' };
  let userId: string;

  it('Login user', async () => {
    await registerMutation(mockUser);
    let { data } = await loginMutation(mockUser);

    // Confirm test user logs in
    expect(data?.login.user).not.toBeNull();

    userId = data!.login.user.id;
  });

  const mockFile: Partial<File> = {
    name: 'index.html',
  };

  it('Creates file', async () => {
    const pg = await new Playground({ name: 'Test', user: userId }).save();

    const { data } = await createFileMutation({
      name: mockFile.name || '',
      playgroundId: pg.id,
    });

    // Returns correct name
    expect(data?.createFile.name).toEqual(mockFile.name);

    // update mockfile to have id and mimetype
    Object.assign(mockFile, data?.createFile);
  });

  it('Gets the file', async () => {
    const { data } = await getFileQuery({ id: mockFile.id || '' });

    expect(data?.getFile).toMatchObject(mockFile);
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
  });
});
