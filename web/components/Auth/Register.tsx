import ErrorMessage from '@components/Form/ErrorMessage';
import Input from '@components/Form/Input';
import { useRegisterMutation } from '@gql/generated';
import { graphqlClient } from '@utils/graphqlClient';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthTemplate from './AuthTemplate';

interface FormValues {
  name: string;
  password: string;
  email: string;
}
const Register = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const registerMutation = useRegisterMutation(graphqlClient);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { register: registerResult } = await registerMutation.mutateAsync(data);

    if (registerResult.errors) {
      const err = registerResult.errors[0];

      setError('email', { message: err?.message, type: 'custom' });
      return;
    }

    router.push('/login?email=' + data.email);
  };

  return (
    <AuthTemplate
      onSubmit={handleSubmit(onSubmit)}
      bottomRender={
        <div className="text-sm text-center">
          <p>
            Already have an account?{' '}
            <Link href="/login" passHref>
              <a href="#" className="font-medium hover:underline">
                Login
              </a>
            </Link>
          </p>
        </div>
      }
    >
      <div className="py-3 space-y-2">
        <h2 className="text-3xl font-bold ">Register </h2>
        <p className="text-sm text-gray-400"> Create an account! </p>
      </div>
      <div>
        <Input label="Name" type="text" {...register('name', { required: true })} />
        <ErrorMessage message="Email is required" isShown={errors.name?.type === 'required'} />
      </div>
      <div>
        <Input label="Email" type="email" {...register('email', { required: true })} />
        <ErrorMessage message="Email is required" isShown={errors.email?.type === 'required'} />

        <ErrorMessage message={errors.email?.message} isShown={errors.email?.type === 'custom'} />
      </div>
      <div>
        <Input
          label="Password"
          type="password"
          {...register('password', { required: true, minLength: 6 })}
        />
        <ErrorMessage
          message="The password needs a minimun of 6 characters"
          isShown={errors.password?.type === 'minLength'}
        />
      </div>

      <button type="submit" className="py-2 font-medium text-white bg-black">
        Register
      </button>
    </AuthTemplate>
  );
};

export default Register;
