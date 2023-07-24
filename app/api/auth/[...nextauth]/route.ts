import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';

import prismaDb from '../../../lib/prisma-db';

const authOptions: AuthOptions = {
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
  debug: process.env.NODE_ENV === 'development'
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
