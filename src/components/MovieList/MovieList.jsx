import s from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';
import noImage from '../../assets/images/no-image.png';
import { baseImgUrl } from '../../services/baseImgUrl';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      <ul className={s.movie_list_container}>
        {movies.map(({ id, poster_path, title, vote_average }) => (
          <li key={id} className={s.movie_list_card}>
            <Link state={location} to={`/movies/${id}`}>
              <img
                src={poster_path ? `${baseImgUrl}${poster_path}` : noImage}
                alt={title}
                className={
                  poster_path ? s.movie_img : `${s.movie_img} ${s.no_image}`
                }
              ></img>
              <p className={s.movie_list_title}>{title}</p>
              <span className={s.movie_list_vote}>
                {(Math.round(vote_average * 10) / 10).toFixed(1)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
