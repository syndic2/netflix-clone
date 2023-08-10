import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import { Response } from '../api/common/response';
import { GetRandomMovieRes } from '../api/movies/random-movie/contracts/get-random-movie.res';

const useBillBoard = () => {
  const { data: res, error, isLoading } = useSWR<Response>('/api/movies/random-movie', fetcher, {
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
