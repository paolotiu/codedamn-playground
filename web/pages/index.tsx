import Layout from '@components/Layout';
import { graphqlClient } from '@utils/graphqlClient';
import { usePingQuery } from 'graphql/generated';

const IndexPage = () => {
  const pingQuery = usePingQuery(graphqlClient, {}, { enabled: false });

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <button
        type="button"
        onClick={async () => {
          const { data } = await pingQuery.refetch();
          console.log(data);
        }}
      >
        Query
      </button>
    </Layout>
  );
};

export default IndexPage;
