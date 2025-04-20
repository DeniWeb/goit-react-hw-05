import { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { fetchMovieById } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import noImage from '../../assets/images/no-image.png';
import s from './MovieDetailsPage.module.css';
import { baseImgUrl } from '../../services/baseImgUrl';
import { MdArrowBack } from 'react-icons/md';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const backLink = useRef(location.state ?? '/movies');

  useEffect(() => {
    const getMovieById = async () => {
      setIsLoading(true);

      try {
        const movie = await fetchMovieById(movieId);

        setMovie(movie);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieById();
  }, [movieId]);

  return (
    <>
      {isLoading && (
        <div className={s.loader_wrapper}>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <>
          <Link to={backLink.current} className={s.go_back_btn}>
            <MdArrowBack /> Go back
          </Link>

          <div className={s.movie_details_container}>
            <img
              src={
                movie.poster_path
                  ? `${baseImgUrl}${movie.poster_path}`
                  : noImage
              }
              alt={movie.title}
              className={s.movie_details_img}
            />

            <div className={s.movie_details_description}>
              <h3 className={s.movie_details_title}>
                {movie.title} ({movie.release_date?.slice(0, 4)})
              </h3>
              <p>
                Users score:{' '}
                {(Math.round(movie.vote_average * 10) / 10).toFixed(1)}
              </p>

              <p>Overview:</p>
              {movie.overview?.trim() ? (
                <span>{movie.overview}</span>
              ) : (
                <span>No review yet.</span>
              )}

              <p>Genres:</p>
              {movie.genres && movie.genres.length > 0 ? (
                <span>{movie.genres?.map(genre => genre.name).join(', ')}</span>
              ) : (
                <span>No genres</span>
              )}

              <p>Additional information:</p>
              <nav className={s.movie_details_nav}>
                <NavLink to="cast" className={s.movie_details_nav_btn}>
                  Cast
                </NavLink>
                <NavLink to="reviews" className={s.movie_details_nav_btn}>
                  Reviews
                </NavLink>
              </nav>
            </div>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
