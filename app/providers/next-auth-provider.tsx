"use client";

import React from 'react';
import { SessionProvider } from 'next-auth/react';

interface NextAuthProviderProps {
  children?: React.ReactNode;
}

const NextAuthProvider: React.FC<NextAuthProviderProps> = (props: NextAuthProviderProps) => {
  const { children } = props;

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default NextAuthProvider;
