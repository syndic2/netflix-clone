import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import { Response } from '../api/common/response';
import { GetCurrentUserRes } from '../api/current/contracts/get-current-user.res';

const useCurrentUser = () => {
  const { data: res, error, isLoading, mutate } = useSWR<Response>('/api/current', fetcher);

  return {
    data: res?.data as GetCurrentUserRes | undefined,
    error,
    isLoading,
    mutate
  };
};

export default useCurrentUser;
