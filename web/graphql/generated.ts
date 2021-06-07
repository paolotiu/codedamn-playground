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
  mimeType: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFile: File;
  updateFile?: Maybe<File>;
  register: UserResponse;
  login: UserResponse;
};


export type MutationCreateFileArgs = {
  name: Scalars['String'];
};


export type MutationUpdateFileArgs = {
  data: UpdateFileInput;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getFile?: Maybe<File>;
  getFileById?: Maybe<File>;
  ping: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryGetFileArgs = {
  name: Scalars['String'];
};


export type QueryGetFileByIdArgs = {
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
      & Pick<File, 'id' | 'name' | 'value' | 'mimeType'>
    )> }
  )> }
);

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'ping'>
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
      mimeType
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