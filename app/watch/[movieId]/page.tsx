"use client";

import React, { useCallback } from 'react';
import { redirect, useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import useMovie from '../../hooks/use-movie';

interface WatchMovieProps {
  params: {
    movieId: string;
  };
}

const WatchMovie: React.FC<WatchMovieProps> = (props: WatchMovieProps) => {
  const { params: { movieId } } = props;
  const router = useRouter();
  const { data: movie } = useMovie(movieId);

  useSession({
    required: true,
    onUnauthenticated: () => {
      redirect('/auth');
    }
  });

  const onBackClick = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="
        fixed
        w-full
        p-4
        z-10
        flex
        items-center
        gap-8
        bg-black
        bg-opacity-70
      ">
        <AiOutlineArrowLeft
          onClick={onBackClick}
          size={40}
          className="text-white cursor-pointer"
        />
        <p className="
          text-white
          text-1xl
          md:text-3xl
          font-bold
          flex
          items-center
          gap-2
        ">
          <span className="font-light">
            Watching
          </span>
          {movie?.title || '-'}
        </p>
      </nav>
      <video
        src={movie?.videoUrl}
        autoPlay
        controls
        className="w-full h-full"
      >
      </video>
    </div>
  );
};

export default WatchMovie;
