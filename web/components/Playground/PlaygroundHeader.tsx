import { useUpdatePlaygroundMutation } from '@gql/generated';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { graphqlClient } from '@utils/graphqlClient';
import React, { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  playgroundId: string;
  playgroundName: string;
}
interface FieldValues {
  name: string;
}

const PlaygroundHeader = ({ playgroundId, playgroundName }: Props) => {
  const { register, handleSubmit } = useForm<FieldValues>();
  const submitInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updatePlaygroundMutation = useUpdatePlaygroundMutation(graphqlClient);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    updatePlaygroundMutation.mutate({ data: { id: playgroundId, name: data.name } });
    inputRef.current?.blur();
  };

  return (
    <div className="flex justify-between px-6 py-3 font-bold text-white bg-black border-b border-off-black ">
      <div>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="text-xl font-bold bg-transparent outline-none focus-visible:shadow-border-b-white"
            defaultValue={playgroundName}
            {...register('name', {})}
            onBlur={() => {
              // Trigger form submission
              submitInputRef.current?.click();
            }}
            ref={inputRef}
          />

          <input type="submit" className="hidden" ref={submitInputRef} />
        </form>
      </div>
      <div>
        <a
          href={`http://localhost:3000/playground/detached/${playgroundId}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center"
        >
          <HiOutlineExternalLink size="25px" />
        </a>
      </div>
    </div>
  );
};

export default PlaygroundHeader;
