import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import { GetMoviesRes } from '../api/movies/contracts/get-movies.res';

const useMovies = () => {
  const { data: res, error, isLoading } = useSWR('/api/movies', fetcher, {
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

