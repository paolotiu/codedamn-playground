import Playground from '@components/Playground/Playground';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React from 'react';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  return {
    props: {
      id,
    },
  };
};

const PlaygroundPage = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Playground id={typeof id === 'string' ? id : ''} />
);

export default PlaygroundPage;
