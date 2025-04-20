import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={s.not_found_wrapper}>
      <h1>Incorrect page address!</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className={s.home_link}>
        Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
