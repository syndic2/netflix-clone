"use client";

import useCurrentUser from './hooks/use-current-user';
import useMovies from './hooks/use-movies';
import useFavorites from './hooks/user-favorites';

import Navbar from './components/navbar';
import Billboard from './components/billboard';
import MovieList from './movie-list/page';

const App = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: movies = [] } = useMovies();
  const { data: favoriteMovies = [] } = useFavorites();

  return (
    <>
      <Navbar currentUser={currentUser} />
      <Billboard />
      <div className="pb-40">
        <MovieList
          title={'Trending Now'}
          data={movies}
        />
        <MovieList
          title={'My Favorite Movies'}
          data={favoriteMovies}
        />
      </div>
    </>
  );
};

export default App;
