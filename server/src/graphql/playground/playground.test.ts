import {
  MutationCreatePlaygroundArgs,
  MutationDeletePlaygroundArgs,
  MutationUpdatePlaygroundArgs,
  Playground as PlaygroundType,
  QueryGetPlaygroundArgs,
} from '@graphql/types';
import File from '@models/File';
import Playground from '@models/Playground';
import { createApolloTestClient } from '@testUtils/createApolloTestClient';
import { createUser } from '@testUtils/createUser';
import {
  CREATE_PLAYGROUND_MUTATION,
  DELETE_PLAYGROUND_MUTATION,
  GET_PLAYGROUND_QUERY,
  UPDATE_PLAYGROUND_MUTATION,
} from '@testUtils/playground.operations';

const { mutate, query, setOptions } = createApolloTestClient();

const createPlaygroundMutation = (variables: MutationCreatePlaygroundArgs) =>
  mutate<{ createPlayground: PlaygroundType }>(CREATE_PLAYGROUND_MUTATION, {
    variables,
  });

const getPlaygroundQuery = (variables: QueryGetPlaygroundArgs) =>
  query<{ getPlayground: PlaygroundType }>(GET_PLAYGROUND_QUERY, { variables });

const updatePlaygroundMutation = (variables: MutationUpdatePlaygroundArgs) =>
  mutate<{ updatePlayground: PlaygroundType }>(UPDATE_PLAYGROUND_MUTATION, {
    variables,
  });

const deletePlaygroundMutation = (variables: MutationDeletePlaygroundArgs) =>
  mutate<{ deletePlayground: PlaygroundType }>(DELETE_PLAYGROUND_MUTATION, {
    variables,
  });

// ------------------------------------
// --------- Start of tests -----------
// ------------------------------------

describe('Playground Operations', () => {
  const mockPlayground: Partial<PlaygroundType> = { name: 'Mock Plaground' };
  let userId: string;
  it('Creates playground', async () => {
    const user = await createUser('playground');
    userId = user.id;

    setOptions({ request: { session: { userId } } });

    const { data } = await createPlaygroundMutation({
      name: mockPlayground.name || '',
    });

    const dbPlayground = await Playground.findOne({
      name: data?.createPlayground.name,
    });

    // Saved in db
    expect(dbPlayground).toBeTruthy();

    // Returns the created file
    expect(data?.createPlayground.name).toEqual(mockPlayground.name);

    // Update mockPlayground
    Object.assign(mockPlayground, data?.createPlayground);
  });

  it('Creates default files', async () => {
    const files = await File.find({
      playground: mockPlayground.id || '',
      user: userId,
    });

    expect(files.length).toBe(3);
  });

  it('Gets playground', async () => {
    const { data } = await getPlaygroundQuery({ id: mockPlayground.id || '' });

    expect(data?.getPlayground).toMatchObject(mockPlayground);
  });

  it('Updates playground', async () => {
    const UPDATED_NAME = 'updatedName';
    await updatePlaygroundMutation({
      data: { id: mockPlayground.id || '', name: UPDATED_NAME },
    });

    const playground = await Playground.findOne({ _id: mockPlayground.id });
    expect(playground?.name).toEqual(UPDATED_NAME);
  });

  it('Deletes playground', async () => {
    await deletePlaygroundMutation({ id: mockPlayground.id || '' });
    const playground = await Playground.findOne({ _id: mockPlayground.id });
    expect(playground).toBeNull();
  });
});
