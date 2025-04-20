import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMoviesTrend } from '../../services/api';
import s from './HomePage.module.css';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [topRateMovies, setTopRateMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        const { results } = await fetchMoviesTrend(page);

        setTopRateMovies(results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [page]);

  return (
    <div className={s.home_container}>
      <h2 className={s.title}>Trending today</h2>
      <MovieList movies={topRateMovies} />
      {isLoading && (
        <div className={s.loader_wrapper}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default HomePage;
