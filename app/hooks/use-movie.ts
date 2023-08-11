import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import { GetMovieRes } from '../api/movies/contracts/get-movie.res';

const useMovie = (movieId?: string) => {
  const { data: res, error, isLoading } = useSWR(movieId ? `/api/movies/${movieId}` : '', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  return {
    data: res?.data as GetMovieRes | undefined,
    error,
    isLoading
  };
};

export default useMovie;
