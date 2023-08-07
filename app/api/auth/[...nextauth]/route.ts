import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from 'bcrypt';

import prismaDb from '../../../lib/prisma-db';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error("Email and password required");

        const user = await prismaDb.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        if (!user || !user.hashedPassword) throw new Error("Email does not exist");

        const isValidPassword = await compare(credentials.password, user.hashedPassword);
        if (!isValidPassword) throw new Error("Incorrect password");

        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
    })
  ],
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth'
  },
  adapter: PrismaAdapter(prismaDb),
  debug: process.env.NODE_ENV === 'development'
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
