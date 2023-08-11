import React, { useCallback } from 'react';
import { signOut } from 'next-auth/react';

import useCurrentUser from '../../hooks/use-current-user';

interface AccountMenuProps {
  visible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = (props: AccountMenuProps) => {
  const { visible } = props;
  const { data: currentUser } = useCurrentUser();

  const onSignOutClick = useCallback(async () => {
    await signOut({ callbackUrl: '/auth', redirect: true });
  }, []);

  return !visible ? null : (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img src="/assets/images/default-red.png" alt="" className="w-8 rounded-md" />
          <p className="text-white text-sm group-hover/item:underline">
            {currentUser?.name || '-'}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div onClick={onSignOutClick} className="px-3 text-center text-white text-sm hover:underline">
          Sign Out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
