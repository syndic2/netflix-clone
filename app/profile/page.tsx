"use client";

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import useCurrentUser from '../hooks/use-current-user';

const Profile: React.FC = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  const onSelectUserClick = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching
        </h1>
        <div className="flex items-center justify-center gap-8 mt-20">
          <div onClick={onSelectUserClick}>
            <div className="group flex-row w-44 mx-auto">
              <div className="
                w-44
                h-44
                rounded-md
                flex
                items-center
                justify-center
                border-2
                border-transparent
                group-hover:cursor-pointer
                group-hover:border-white
                overflow-hidden
              ">
                <img src="/assets/images/default-red.png" alt="Profile" />
              </div>

              <div className="
                mt-4
                text-gray-400
                text-2xl
                text-center
                group-hover:text-white
              ">
                {user?.name || '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
