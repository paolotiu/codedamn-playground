import { useGetUserQuery, User } from '@gql/generated';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { graphqlClient } from './graphqlClient';

interface UseUserOpts {
  redirect?: string;
}

interface UseUserDefaultOpts extends UseUserOpts {
  redirect: string;
}

const defaultOptions: UseUserDefaultOpts = {
  redirect: '/login',
};

export const useUser = (props = defaultOptions) => {
  const { redirect } = props;
  const [user, setUser] = useState<Omit<User, 'files' | 'playgrounds'>>();

  // Cache time to zero to prevent false negatives/positives
  const userQuery = useGetUserQuery(graphqlClient, {}, { cacheTime: 0 });
  const router = useRouter();

  useEffect(() => {
    if (userQuery.isSuccess) {
      if (userQuery.data.me) {
        setUser(userQuery.data.me);
      } else {
        // User is null
        // Meaning unauthenticated
        router.push(redirect);
      }
    }
  }, [redirect, router, userQuery]);

  return user;
};
