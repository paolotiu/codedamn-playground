import React from 'react';

interface Props {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children?: React.ReactNode;
  bottomRender?: React.ReactNode;
}

const AuthTemplate = ({ onSubmit, children, bottomRender }: Props) => {
  return (
    <div className="flex justify-center pt-[50px]">
      <div className="border w-[410px] max-w-[90vw] p-4 ">
        <form onSubmit={onSubmit} className="grid gap-5 ">
          {children}
        </form>
        <div className="py-5">
          <hr />
        </div>
        <div className="text-sm text-center">{bottomRender}</div>
      </div>
    </div>
  );
};

export default AuthTemplate;
