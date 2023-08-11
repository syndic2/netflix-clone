import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import { GetFavoriteMoviesRes } from '../api/movies/favorites/contracts/get-favorite-movies.res';

const useFavorites = () => {
  const { data: res, error, isLoading, mutate } = useSWR('/api/movies/favorites', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  return {
    data: res?.data as GetFavoriteMoviesRes[] | undefined,
    error,
    isLoading,
    mutate
  };
};

export default useFavorites;
