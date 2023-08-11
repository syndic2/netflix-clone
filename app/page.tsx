"use client";

import useMovies from './hooks/use-movies';
import useFavorites from './hooks/use-favorites';
import useInfoModal from './hooks/user-info-modal';

import Navbar from './components/navbar';
import Billboard from './components/billboard';
import MovieList from './movie-list';
import InfoModal from './components/info-modal';

const App = () => {
  const { data: movies = [] } = useMovies();
  const { data: favoriteMovies = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal
        visible={isOpen}
        onCloseClick={closeModal}
      />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList
          itemKeyName={'trending-movie'}
          title={'Trending Now'}
          data={movies}
        />
        <MovieList
          itemKeyName={'favorite-movie'}
          title={'My Favorite Movies'}
          data={favoriteMovies}
        />
      </div>
    </>
  );
};

export default App;
