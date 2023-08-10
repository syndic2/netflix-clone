import { getServerSession } from 'next-auth';

import prismaDb from './prisma-db';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { GetCurrentUserRes } from '../api/current/contracts/get-current-user.res';

interface ServerAuthResponse {
  currentUser: GetCurrentUserRes;
}

const serverAuth = async (): Promise<ServerAuthResponse> => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error('Not signed in');

  const currentUser = await prismaDb.user.findUnique({
    where: {
      email: session.user.email
    }
  });
  if (!currentUser) throw new Error('Not signed in');

  return {
    currentUser: {
      ...currentUser.id && { id: currentUser.id },
      ...currentUser.name && { name: currentUser.name },
      ...currentUser.email && { email: currentUser.email },
      ...currentUser.image && { image: currentUser.image },
      ...currentUser.favoriteIds && { favorite_ids: currentUser.favoriteIds }
    }
  };
};

export default serverAuth;
