import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import clsx from 'clsx';
import css from './Navigation.module.css';


const buildCssClasses = ({ isActive }) =>
  clsx(css.link, isActive && css.active);

export default function Navigation () {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      <NavLink className={buildCssClasses} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={buildCssClasses} to="/private">
          Private page
        </NavLink>
      )}
    </>
  );
};