import {
  useGetAllPlaygroundsQuery,
  useCreatePlaygroundMutation,
  useDeletePlaygroundMutation,
} from '@gql/generated';
import dayjs from 'dayjs';
import { graphqlClient } from '@utils/graphqlClient';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { useQueryClient } from 'react-query';

const Dashboard = () => {
  const playgroundsQuery = useGetAllPlaygroundsQuery(graphqlClient);
  const queryClient = useQueryClient();
  const createPlaygroundMutation = useCreatePlaygroundMutation(graphqlClient);
  const deletePlaygroundMutation = useDeletePlaygroundMutation(graphqlClient, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllPlaygrounds');
    },
  });

  const router = useRouter();
  const handleCreatePlayground = async () => {
    const { createPlayground } = await createPlaygroundMutation.mutateAsync({
      name: 'HTML Playground',
    });
    router.push('http://localhost:3000/playground/' + createPlayground.id);
  };

  return (
    <section className="p-4">
      <div className="px-3 py-2">
        <h1 className="text-4xl font-bold">Playgrounds</h1>
        <div className="py-3 h-[10px]">
          <div className="w-full h-[2px] bg-gray-100"></div>
        </div>
        <div
          className="grid gap-8 pt-4 "
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(150px, 300px))' }}
        >
          <button
            type="button"
            className="p-4 text-2xl font-bold border rounded"
            onClick={handleCreatePlayground}
          >
            Create Playground
          </button>
          {playgroundsQuery.data?.me?.playgrounds.map((pg) => {
            return (
              <Link href={`/playground/${pg.id}`} key={pg.id}>
                <div className="relative p-4 break-words border rounded cursor-pointer group">
                  <h3 className="pr-3 text-2xl font-bold break-words">{pg.name}</h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePlaygroundMutation.mutate({ id: pg.id });
                    }}
                    className="absolute hidden text-red-500 right-3 top-2 group-hover:block hover:scale-105 hover:transform"
                  >
                    <FiTrash />
                  </button>
                  <div className="py-4">
                    <hr />
                  </div>
                  <div className="space-y-1 text-xs text-gray-400 ">
                    <p>
                      Last Updated: {dayjs(new Date(pg.updatedAt)).format('MMMM D, YYYY - HH:mm')}
                    </p>
                    <p>Created At: {dayjs(new Date(pg.createdAt)).format('MMMM D,YYYY')}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
