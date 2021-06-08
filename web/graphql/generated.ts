import { GraphQLClient } from 'graphql-request';
import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFile: File;
  updateFile?: Maybe<File>;
  createPlayground: Playground;
  register: UserResponse;
  login: UserResponse;
};


export type MutationCreateFileArgs = {
  name: Scalars['String'];
  playgroundId: Scalars['String'];
};


export type MutationUpdateFileArgs = {
  data: UpdateFileInput;
};


export type MutationCreatePlaygroundArgs = {
  name: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Playground = {
  __typename?: 'Playground';
  name: Scalars['String'];
  files?: Maybe<Array<File>>;
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getFile?: Maybe<File>;
  getPlayground?: Maybe<Playground>;
  ping: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryGetFileArgs = {
  id: Scalars['ID'];
};


export type QueryGetPlaygroundArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  playground?: Maybe<Scalars['Int']>;
};


export type SubscriptionPlaygroundArgs = {
  id: Scalars['ID'];
};

export type UpdateFileInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  files: Array<File>;
  playgrounds: Array<Playground>;
  id: Scalars['ID'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

export type FilesQueryVariables = Exact<{ [key: string]: never; }>;


export type FilesQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & { files: Array<(
      { __typename?: 'File' }
      & Pick<File, 'id' | 'name' | 'value'>
    )> }
  )> }
);

export type UpdateFileMutationVariables = Exact<{
  data: UpdateFileInput;
}>;


export type UpdateFileMutation = (
  { __typename?: 'Mutation' }
  & { updateFile?: Maybe<(
    { __typename?: 'File' }
    & Pick<File, 'id'>
  )> }
);

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'ping'>
);

export type GetPlaygroundQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPlaygroundQuery = (
  { __typename?: 'Query' }
  & { getPlayground?: Maybe<(
    { __typename?: 'Playground' }
    & Pick<Playground, 'name'>
    & { files?: Maybe<Array<(
      { __typename?: 'File' }
      & Pick<File, 'id' | 'name' | 'value'>
    )>> }
  )> }
);

export type GetAllPlaygroundsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPlaygroundsQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & { playgrounds: Array<(
      { __typename?: 'Playground' }
      & Pick<Playground, 'id' | 'name'>
    )> }
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>>> }
  ) }
);


export const FilesDocument = `
    query files {
  me {
    files {
      id
      name
      value
    }
  }
}
    `;
export const useFilesQuery = <
      TData = FilesQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables?: FilesQueryVariables, 
      options?: UseQueryOptions<FilesQuery, TError, TData>
    ) => 
    useQuery<FilesQuery, TError, TData>(
      ['files', variables],
      fetcher<FilesQuery, FilesQueryVariables>(client, FilesDocument, variables),
      options
    );
export const UpdateFileDocument = `
    mutation updateFile($data: UpdateFileInput!) {
  updateFile(data: $data) {
    id
  }
}
    `;
export const useUpdateFileMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<UpdateFileMutation, TError, UpdateFileMutationVariables, TContext>
    ) => 
    useMutation<UpdateFileMutation, TError, UpdateFileMutationVariables, TContext>(
      (variables?: UpdateFileMutationVariables) => fetcher<UpdateFileMutation, UpdateFileMutationVariables>(client, UpdateFileDocument, variables)(),
      options
    );
export const PingDocument = `
    query ping {
  ping
}
    `;
export const usePingQuery = <
      TData = PingQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables?: PingQueryVariables, 
      options?: UseQueryOptions<PingQuery, TError, TData>
    ) => 
    useQuery<PingQuery, TError, TData>(
      ['ping', variables],
      fetcher<PingQuery, PingQueryVariables>(client, PingDocument, variables),
      options
    );
export const GetPlaygroundDocument = `
    query getPlayground($id: ID!) {
  getPlayground(id: $id) {
    name
    files {
      id
      name
      value
    }
  }
}
    `;
export const useGetPlaygroundQuery = <
      TData = GetPlaygroundQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: GetPlaygroundQueryVariables, 
      options?: UseQueryOptions<GetPlaygroundQuery, TError, TData>
    ) => 
    useQuery<GetPlaygroundQuery, TError, TData>(
      ['getPlayground', variables],
      fetcher<GetPlaygroundQuery, GetPlaygroundQueryVariables>(client, GetPlaygroundDocument, variables),
      options
    );
export const GetAllPlaygroundsDocument = `
    query getAllPlaygrounds {
  me {
    playgrounds {
      id
      name
    }
  }
}
    `;
export const useGetAllPlaygroundsQuery = <
      TData = GetAllPlaygroundsQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables?: GetAllPlaygroundsQueryVariables, 
      options?: UseQueryOptions<GetAllPlaygroundsQuery, TError, TData>
    ) => 
    useQuery<GetAllPlaygroundsQuery, TError, TData>(
      ['getAllPlaygrounds', variables],
      fetcher<GetAllPlaygroundsQuery, GetAllPlaygroundsQueryVariables>(client, GetAllPlaygroundsDocument, variables),
      options
    );
export const LoginDocument = `
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
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>
    ) => 
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables)(),
      options
    );