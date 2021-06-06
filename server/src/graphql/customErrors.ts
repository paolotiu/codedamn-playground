import { ApolloError } from 'apollo-server-errors';

// Apollo docs link to creating custom errors
// https://www.apollographql.com/docs/apollo-server/data/errors/#custom-errors
export class AuthError extends ApolloError {
  constructor(message?: string) {
    // Have a default auth error message
    super(message || 'Not authorized', 'AUTH_ERROR');

    Object.defineProperty(this, 'name', { value: 'AuthError' });
  }
}

interface NotFoundArgs {
  message?: string;
  item?: string;
}
export class NotFoundByIdError extends ApolloError {
  constructor({ message, item }: NotFoundArgs) {
    // Have a default auth error message
    super(message || `No ${item} with that id found`, 'NOT_FOUND_ERROR');

    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}
