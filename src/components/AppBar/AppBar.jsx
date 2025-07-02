// import { useSelector } from "react-redux";
import css from "./AppBar.module.css";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing
} from "../../redux/auth/selectors.js";

export default function AppBar() {
  const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  if (isRefreshing) return null; // або loader
  return (
    <div className={css.container}>
      <nav>
        <NavLink to="/" className={getLinkStyles}>
          Recipes
        </NavLink>
      </nav>

      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
}
