import React from 'react';

interface Props {
  isShown?: boolean;
  message?: string;
}

const ErrorMessage = ({ isShown, message }: Props) => {
  if (!isShown) return null;

  return <p className="pt-1 text-sm text-red-500 ">{message}</p>;
};

export default ErrorMessage;
