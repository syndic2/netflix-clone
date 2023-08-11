import React from 'react';
import { isEmpty } from 'lodash';

import { GetMoviesRes } from '../../api/movies/contracts/get-movies.res';
import MovieItem from './components/movie-item';

interface MovieListProps {
  itemKeyName: string;
  title: string;
  data: GetMoviesRes[];
}

const MovieList: React.FC<MovieListProps> = (props: MovieListProps) => {
  const {
    itemKeyName,
    title,
    data
  } = props;

  return isEmpty(data) ? null : (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data.map(movie => (
            <div
              key={`${itemKeyName}-${movie.id}`}
              className="text-white"
            >
              <MovieItem data={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
