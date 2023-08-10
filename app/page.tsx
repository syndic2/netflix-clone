"use client";

import useMovies from './hooks/use-movies';
import Navbar from './components/navbar';
import Billboard from './components/billboard';
import MovieList from './movie-list/page';

const App = () => {
  const { data: movies = [] } = useMovies();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList
          title={'Trending Now'}
          data={movies}
        />
      </div>
    </>
  );
};

export default App;
