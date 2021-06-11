import ErrorMessage from '@components/Form/ErrorMessage';
import Input from '@components/Form/Input';
import { graphqlClient } from '@utils/graphqlClient';
import { useLoginMutation } from 'graphql/generated';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import AuthTemplate from './AuthTemplate';

interface FormValues {
  email: string;
  password: string;
}
const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();
  const loginMutation = useLoginMutation(graphqlClient, {});
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    const { login } = await loginMutation.mutateAsync(data);
    if (login.errors) {
      // Set the error given from server
      setError('email', { message: login.errors[0]?.message, type: 'manual' });
      return;
    }

    router.push('/dashboard');
  };
  return (
    <AuthTemplate
      onSubmit={handleSubmit(onSubmit)}
      bottomRender={
        <div className="text-sm text-center">
          <p>
            Dont have an account?{' '}
            <Link href="/register" passHref>
              <a href="#" className="font-medium hover:underline">
                Register
              </a>
            </Link>
          </p>
        </div>
      }
    >
      <div className="py-3 space-y-2">
        <h2 className="text-3xl font-bold ">Login </h2>
        <p className="text-sm text-gray-400">Start your playground now! </p>
      </div>
      <div>
        <Input
          label="Email"
          type="email"
          placeholder="example@email.com"
          defaultValue={router.query.email || ''}
          {...register('email', { required: true })}
        />
        <ErrorMessage message="Email is required" isShown={errors.email?.type === 'required'} />
        <ErrorMessage message={errors.email?.message} isShown={errors.email?.type === 'manual'} />
      </div>

      <Input
        label="Password"
        type="password"
        {...register('password', {})}
        placeholder="yourPassword1337"
      />
      <button type="submit" className="py-2 font-medium text-white bg-black">
        Login
      </button>
    </AuthTemplate>
  );
};

export default Auth;
