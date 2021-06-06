import { Session } from 'express-session';

// For typescript to be happy with use setting the userId in the session object
// Credits: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/49941#issuecomment-748513261
declare module 'express-session' {
  interface Session {
    userId?: string;
  }
}
