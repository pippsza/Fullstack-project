// import { useSelector } from "react-redux";
import css from "./AppBar.module.css";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
export default function AppBar() {
  const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  const isLoggedIn = true;
  return (
    <header className={css.header}>
      <nav>
        <NavLink to="/" className={getLinkStyles}>
          Recipes
        </NavLink>
      </nav>

      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
