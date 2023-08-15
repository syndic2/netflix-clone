import type { Metadata } from 'next';

import NextAuthProvider from './providers/next-auth-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'Netflix clone web application'
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
};
