import React, { useCallback } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import useBillBoard from '../../hooks/use-billboard';
import useInfoModal from '@/app/hooks/user-info-modal';
import PlayButton from '../play-button';

const Billboard = () => {
  const { data: movie } = useBillBoard();
  const { openModal } = useInfoModal();

  const onInfoClickCallback = useCallback(() => {
    openModal(movie?.id);
  }, [movie?.id]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        src={movie?.videoUrl}
        poster={movie?.thumbnailUrl}
        autoPlay
        muted
        loop
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
      >
      </video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="
        text-white
        text-xl
        md:text-5xl
        h-full
        w-[50%]
        lg:text-6xl
        font-bold
        drop-shadow-xl
        ">
          {movie?.title || '-'}
        </p>
        <p className="
        text-white
        text-[8px]
        md:text-lg
        mt-3
        md:mt-8
        w-[90%]
        md:w-[80%]
        lg:w-[50%]
        drop-shadow-xl
        ">
          {movie?.description || '-'}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={movie?.id} />
          <button
            onClick={onInfoClickCallback}
            className="
              bg-white
              text-white
              bg-opacity-30
              rounded-md
              py-1 md:py-2
              px-2 md:px-4
              w-auto
              text-xs lg:text-lg
              flex
              items-center
              hover:bg-opacity-20
              transition
            "
          >
            <AiOutlineInfoCircle className="mr-1.5" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
