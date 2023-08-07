"use client";

import { signOut } from 'next-auth/react';
import { useCallback } from 'react';
import useCurrentUser from './hooks/use-current-user';

const App = () => {
  const { data: res } = useCurrentUser();

  const onSignOutClick = useCallback(async () => {
    await signOut({ callbackUrl: '/auth', redirect: true });
  }, []);

  return (
    <>
      <h1 className='text-2xl text-white'>Netflix Clone</h1>
      <p className="text-white">Logger in as: {res?.email || '-'}</p>
      <button onClick={onSignOutClick} className="w-full h-10 bg-white">
        Logout
      </button>
    </>
  );
};

export default App;
