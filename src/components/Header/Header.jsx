import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { MdOutlineHome, MdOutlineLocalMovies } from 'react-icons/md';

const Header = () => {
  const setIsActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <header className={s.header_container}>
      <h1>The Movie Database</h1>
      <nav className={s.header_nav}>
        <NavLink className={setIsActiveClass} to="/">
          Home <MdOutlineHome />
        </NavLink>
        <NavLink className={setIsActiveClass} to="/movies">
          Movies <MdOutlineLocalMovies />
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
