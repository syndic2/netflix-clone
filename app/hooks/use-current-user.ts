import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import { GetCurrentUserRes } from '../api/users/current/contracts/get-current-user.res';

const useCurrentUser = () => {
  const { data: res, error, isLoading, mutate } = useSWR('/api/users/current', fetcher);

  return {
    data: res?.data as GetCurrentUserRes | undefined,
    error,
    isLoading,
    mutate
  };
};

export default useCurrentUser;
