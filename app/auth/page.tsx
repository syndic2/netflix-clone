"use client";

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState, useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import axios, { AxiosError } from 'axios';

import { Response } from '../api/common/response';
import { RegisterBody } from '../api/auth/register/contracts/register.body';
import Input from '../components/input';

enum AUTH_TYPE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER"
}

const Auth = () => {
  const router = useRouter();

  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const [variant, setVariant] = useState<AUTH_TYPE>(AUTH_TYPE.LOGIN);

  const isLoginVariant = variant === AUTH_TYPE.LOGIN;

  const onUsernameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const onEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const onPasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const onToggleVariant = useCallback(() => {
    setVariant(currentVariant => currentVariant === AUTH_TYPE.LOGIN ? AUTH_TYPE.REGISTER : AUTH_TYPE.LOGIN);
  }, []);

  const onLoginClick = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const signInResult = await signIn('credentials', { email, password, redirect: false });
      if (signInResult?.error) {
        alert(signInResult.error);
        return;
      }

      router.push('/profile');
    } catch (error: any) {
      console.error(error);
    }
  }, [email, password, router]);

  const onRegisterClick = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const bodyData: RegisterBody = {
        name,
        email,
        password
      };
      const { data: res } = await axios.post<Response>('api/auth/register', bodyData);
      alert(res.message);
    } catch (error: any) {
      const err = error as AxiosError<Response>;
      const { response } = err;
      alert(response?.data.message);
    }
  }, [name, email, password]);

  // const onGoogleSignInClick = useCallback(async () => {
  //   await signIn('google', { callbackUrl: '/profile' });
  // }, []);

  // const onGithubSignInClick = useCallback(async () => {
  //   await signIn('github', { callbackUrl: '/profile' });
  // }, []);

  return (
    <div className="relative w-full h-full bg-[url('/assets/images/hero.jpg')]">
      <div className="bg-black w-full lg:bg-opacity-50">
        {/* Navbar */}
        <nav className="px-12 py-5">
          <img src="/assets/images/logo.png" alt="" className="h-12" />
        </nav>
        {/* Navbar */}

        {/* Content */}
        <div className="flex justify-center">
          <div className="self-center bg-black bg-opacity-70 mt-2 px-16 py-16 lg:w-2/5 lg:max-w-md rounded-md">
            {/* Title */}
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {isLoginVariant ? 'Sign In' : 'Register'}
            </h2>
            {/* Title */}

            {/* Input */}
            <div className="flex flex-col gap-4">
              {!isLoginVariant ? (
                <Input
                  id={'name'}
                  type={'text'}
                  label={'Username'}
                  value={name}
                  onChange={onUsernameChange}
                />
              ) : null}
              <Input
                id={'email'}
                type={'email'}
                label={'Email'}
                value={email}
                onChange={onEmailChange}
              />
              <Input
                id={'password'}
                type={'password'}
                label={'Password'}
                value={password}
                onChange={onPasswordChange}
              />
            </div>
            {/* Input */}

            {/* Action Button */}
            <button
              onClick={isLoginVariant ? onLoginClick : onRegisterClick}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {isLoginVariant ? 'Login' : 'Sign Up'}
            </button>
            <div className="flex justify-center items-center gap-4 mt-8">
              <div
                // onClick={onGoogleSignInClick}
                className="
                w-10
                h-10
                bg-white
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer
                hover:opacity-80
                transition
              ">
                <FcGoogle size={30} />
              </div>
              <div
                // onClick={onGithubSignInClick}
                className="
                w-10
                h-10
                bg-white
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer
                hover:opacity-80
                transition
              ">
                <FaGithub size={30} />
              </div>
            </div>
            {/* Action Button */}

            {/* Toggle Variant Button */}
            <p className="text-neutral-500 mt-12">
              {isLoginVariant ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={onToggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {isLoginVariant ? 'Create an account' : 'Login'}
              </span>
            </p>
            {/* Toggle Variant Button */}
          </div>
        </div>
        {/* Content */}
      </div>
    </div>
  );
};

export default Auth;
