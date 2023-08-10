import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import { GetRandomMovieRes } from '../api/movies/random/contracts/get-random-movie.res';

const useBillBoard = () => {
  const { data: res, error, isLoading } = useSWR('/api/movies/random', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  return {
    data: res?.data as GetRandomMovieRes | undefined,
    error,
    isLoading
  };
};

export default useBillBoard;
