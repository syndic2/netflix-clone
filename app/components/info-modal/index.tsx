import React, { useState, useCallback, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import useInfoModal from '../../hooks/user-info-modal';
import useMovie from '@/app/hooks/use-movie';
import PlayButton from '../play-button';
import FavoriteButton from '../favorite-button';

interface InfoModalProps {
  visible?: boolean;
  onCloseClick: () => void;
}

const InfoModal: React.FC<InfoModalProps> = (props: InfoModalProps) => {
  const { visible, onCloseClick } = props;
  const { movieId } = useInfoModal();
  const { data: movie } = useMovie(movieId);

  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const onCloseClickCallback = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onCloseClick();
    }, 300);
  }, [onCloseClick]);

  return !visible ? null : (
    <div className="
      z-50
      transition
      duration-300
      bg-black
      bg-opacity-80
      flex
      justify-center
      items-center
      overflow-x-hidden
      overflow-y-auto
      fixed
      insert-0
      w-screen
      h-screen
    ">
      <div className="
        relative
        w-auto
        mx-auto
        max-w-3xl
        rounded-md
        overflow-hidden
      ">
        <div className={`
          ${isVisible ? 'scale-100' : 'scale-0'}
          transform
          duration-300
          relative
          flex-auto
          bg-zinc-900
          drop-shadow-md
        `}>
          <div className="relative h-96">
            <video
              src={movie?.videoUrl}
              poster={movie?.thumbnailUrl}
              autoPlay
              muted
              loop
              className="
                w-full
                h-full
                object-cover
                brightness-[60%]
              "
            >
            </video>

            {/* Close Button */}
            <div
              onClick={onCloseClickCallback}
              className="
                cursor-pointer
                absolute
                top-3
                right-3
                h-10
                w-10
                rounded-full
                bg-black
                bg-opacity-70
                flex
                items-center
                justify-center
              "
            >
              <AiOutlineClose
                size={25}
                className="text-white"
              />
            </div>
            {/* Close Button */}

            {/* Action Buttons */}
            <div className="
              absolute
              bottom-[10%]
              left-10
            ">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {movie?.title || '-'}
              </p>
              <div className=" flex gap-4 items-center">
                <PlayButton movieId={movie?.id} />
                <FavoriteButton movieId={movie?.id} />
              </div>
            </div>
            {/* Action Buttons */}
          </div>

          <div className="px-8 py-4">
            <p className="text-green-400 font-semibold text-lg">
              New
            </p>
            <p className="text-white text-lg">
              {movie?.duration || '-'}
            </p>
            <p className="text-white text-lg">
              {movie?.genre || '-'}
            </p>
            <p className="text-white text-lg">
              {movie?.description || '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
