import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';

import { GetMoviesRes } from '../../../../api/movies/contracts/get-movies.res';
import useInfoModal from '../../../../hooks/user-info-modal';
import FavoriteButton from '../../../../components/favorite-button';

interface MovieItemProps {
  data?: GetMoviesRes;
}

const MovieItem = (props: MovieItemProps) => {
  const { data } = props;
  const router = useRouter();
  const { openModal } = useInfoModal();

  const onPlayClick = useCallback(() => {
    router.push(`/watch/${data?.id}`);
  }, [data?.id, router]);

  const onInfoClick = useCallback(() => {
    openModal(data?.id);
  }, [data?.id, openModal]);

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        src={data?.thumbnailUrl}
        alt="Thumbnail"
        className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        delay-300
        w-full
        h-[12vw]
        "
      />

      {/* Thumbnail Scalable Effect */}
      <div className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100
      ">
        <img
          src={data?.thumbnailUrl}
          alt="Thumbnail"
          className="
            cursor-pointer
            object-hover
            transition
            duration
            shadow-xl
            rounded-t-md
            w-full
            h-[12vw]
          "
        />
        <div className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
        ">
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div
              onClick={onPlayClick}
              className="
                cursor-pointer
                w-6
                h-6
                lg:w-10
                lg:h-10
                bg-white
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:bg-neutral-300
              "
            >
              <BsFillPlayFill
                size={30}
                className="text-black"
              />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div
              onClick={onInfoClick}
              className="
                cursor-pointer
                ml-auto
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
                hover:border-neutral-300
              "
            >
              <BiChevronDown
                size={30}
                className="text-white group-hover/item:text-neutral-300 w-4"
              />
            </div>
          </div>
          {/* Action Buttons */}

          {/* New Indicator */}
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          {/* New Indicator */}

          {/* Duration */}
          <div className="flex mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {data?.duration || '-'}
            </p>
          </div>
          {/* Duration */}

          {/* Genre */}
          <div className="flex mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {data?.genre || '-'}
            </p>
          </div>
          {/* Genre */}
        </div>
      </div>
      {/* Thumbnail Scalable Effect */}
    </div>
  );
};

export default MovieItem;
