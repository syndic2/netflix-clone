import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import { Response } from '../api/common/response';
import { GetMoviesRes } from '../api/movies/contracts/get-movies.res';

const useMovies = () => {
  const { data: res, error, isLoading } = useSWR<Response>('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  return {
    data: res?.data as GetMoviesRes[] | undefined,
    error,
    isLoading
  };
};

export default useMovies;

