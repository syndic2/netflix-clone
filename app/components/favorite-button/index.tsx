import React, { useMemo, useCallback } from 'react';
import axios from 'axios';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

import { Response } from '../../api/common/response';
import { GetCurrentUserRes } from '@/app/api/users/current/contracts/get-current-user.res';
import { AddFavoriteMovieBody } from '@/app/api/movies/favorites/contracts/add-favorite-movie.body';
import useCurrentUser from '../../hooks/use-current-user';
import useFavorites from '../../hooks/user-favorites';

interface FavoriteButtonProps {
  movieId?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = (props: FavoriteButtonProps) => {
  const {
    movieId
  } = props;

  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFavorites } = useFavorites();

  const isFavorite = useMemo((): boolean => {
    if (!movieId) return false;

    const favoriteIds = currentUser?.favorite_ids || [];
    return favoriteIds.includes(movieId);
  }, [movieId, currentUser]);

  const onFavoriteClick = useCallback(async () => {
    const body: AddFavoriteMovieBody = { movie_id: movieId };
    const { data: res } = isFavorite ?
      await axios.delete<Response<GetCurrentUserRes>>(`/api/movies/favorites/${movieId}`) :
      await axios.post<Response<GetCurrentUserRes>>('/api/movies/favorites', { ...body });
    alert(res.message);

    if (res.status) {
      const updatedFavoriteIds = res.data?.favorite_ids;
      mutateCurrentUser({
        ...currentUser,
        favorite_ids: updatedFavoriteIds
      });
      mutateFavorites();
    }
  }, [
    movieId,
    isFavorite,
    currentUser,
    mutateCurrentUser,
    mutateFavorites
  ]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={onFavoriteClick}
      className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-white
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-neutral-300
      "
    >
      <Icon
        size={25}
        className="text-white"
      />
    </div>
  );
};

export default FavoriteButton;
