import {
  MutationCreatePlaygroundArgs,
  Playground as PlaygroundType,
  QueryGetPlaygroundArgs,
} from '@graphql/types';
import Playground from '@models/Playground';
import User from '@models/User';
import { createApolloTestClient } from '@testUtils/createApolloTestClient';
import {
  CREATE_PLAYGROUND_MUTATION,
  GET_PLAYGROUND_QUERY,
} from '@testUtils/playground.operations';

const { mutate, query, setOptions } = createApolloTestClient();

const createPlaygroundMutation = (variables: MutationCreatePlaygroundArgs) =>
  mutate<{ createPlayground: PlaygroundType }>(CREATE_PLAYGROUND_MUTATION, {
    variables,
  });

const getPlaygroundQuery = (variables: QueryGetPlaygroundArgs) =>
  query<{ getPlayground: PlaygroundType }>(GET_PLAYGROUND_QUERY, { variables });

describe('Playground Operations', () => {
  const mockPlayground: Partial<PlaygroundType> = { name: 'Mock Plaground' };
  it('Creates playground', async () => {
    const user = await new User({
      email: 'playground@test.com',
      password: 'testPassword',
    }).save();
    setOptions({ request: { session: { userId: user.id } } });

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

  it('Gets playground', async () => {
    const { data } = await getPlaygroundQuery({ id: mockPlayground.id || '' });

    expect(data?.getPlayground).toMatchObject(mockPlayground);
  });
});
