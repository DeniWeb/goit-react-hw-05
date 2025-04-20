import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieByIdReviews } from '../../services/api';
import Loader from '../Loader/Loader';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const reviewsRef = useRef(null);
  const noReviewsRef = useRef(null);

  useEffect(() => {
    if (!movieId) return;

    const getMovieReviews = async () => {
      setIsLoading(true);
      try {
        const reviews = await fetchMovieByIdReviews(movieId);
        setReviews(reviews.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieReviews();
  }, [movieId]);

  useEffect(() => {
    if (reviews.length > 0) {
      reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      noReviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [reviews]);

  return (
    <>
      {isLoading && (
        <div className={s.loader_wrapper}>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <ul className={s.reviews_container} ref={reviewsRef}>
          {reviews.map(item => (
            <li key={item.id} className={s.reviews_item_container}>
              <p className={s.reviews_author}>{item.author}</p>
              <p className={s.reviews_content}>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && reviews.length === 0 && (
        <p className={s.no_reviews} ref={noReviewsRef}>
          No reviews yet...
        </p>
      )}
    </>
  );
};

export default MovieReviews;
