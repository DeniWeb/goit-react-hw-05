import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovieByKeyWord } from '../../services/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import s from './MoviesPage.module.css';
import Loader from '../../components/Loader/Loader';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    const getMovie = async () => {
      setIsLoading(true);
      try {
        const { results } = await fetchMovieByKeyWord(query);
        setMovies(results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovie();
  }, [query]);

  const handleChangeQuery = newValue => {
    if (!newValue) {
      searchParams.delete('query');
      return setSearchParams(searchParams);
    }
    searchParams.set('query', newValue);
    setSearchParams(searchParams);
  };

  return (
    <section className={s.movies_page_container}>
      {isLoading && (
        <div className={s.loader_wrapper}>
          <Loader />
        </div>
      )}
      <SearchBar handleChangeQuery={handleChangeQuery} />

      {movies.length > 0 && <MovieList movies={movies} />}
    </section>
  );
};

export default MoviesPage;
