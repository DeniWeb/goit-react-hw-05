import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieByIdCast } from '../../services/api';
import Loader from '../Loader/Loader';
import { baseImgUrl } from '../../services/baseImgUrl';
import noImage from '../../assets/images/no-image.png';
import s from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const castRef = useRef(null);
  const noCastRef = useRef(null);

  useEffect(() => {
    if (!movieId) return;

    const getMovieCast = async () => {
      setIsLoading(true);
      try {
        const movieCast = await fetchMovieByIdCast(movieId);
        setCast(movieCast.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieCast();
  }, [movieId]);

  useEffect(() => {
    if (cast.length > 0) {
      castRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      noCastRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cast]);

  return (
    <>
      {isLoading && (
        <div className={s.loader_wrapper}>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <ul className={s.cast_container} ref={castRef}>
          {cast.map(item => (
            <li key={item.id} className={s.cast_item}>
              <img
                src={
                  item.profile_path
                    ? `${baseImgUrl}${item.profile_path}`
                    : noImage
                }
                alt={item.original_name}
                className={
                  item.profile_path
                    ? s.cast_img
                    : `${s.cast_img} ${s.cast_no_image}`
                }
              />
              <p className={s.cast_actor_name}>{item.original_name}</p>
              <p className={s.cast_actor_character}>{item.character}</p>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && cast.length === 0 && (
        <p className={s.no_cast} ref={noCastRef}>
          No actors yet...
        </p>
      )}
    </>
  );
};

export default MovieCast;
