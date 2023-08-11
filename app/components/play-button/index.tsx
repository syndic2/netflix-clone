import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { BsPlayFill } from 'react-icons/bs';

interface PlayButtonProps {
  movieId?: string;
}

const PlayButton: React.FC<PlayButtonProps> = (props: PlayButtonProps) => {
  const { movieId } = props;
  const router = useRouter();

  const onPlayClick = useCallback(() => {
    router.push(`/watch/${movieId}`);
  }, [movieId, router]);

  return (
    <button
      onClick={onPlayClick}
      className="
        bg-white
        rounded
        py-1 md:py-2
        px-2 md:px-4
        w-auto
        text-xs lg:text-lg
        font-semibold
        flex
        items-center
        hover:bg-neutral-300
        transition
      "
    >
      <BsPlayFill size={25} className="mr-1" />
      Play
    </button>
  );
};

export default PlayButton;
