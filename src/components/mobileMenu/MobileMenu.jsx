import { NavLink } from "react-router-dom";
import css from "./MobileMenu.module.css";
import AuthNavMobile from "../AuthNavMobile/AuthNavMobile.jsx";
import UserMenuMobile from "../UserMenuMobile/UserMenuMobile.jsx";
import clsx from "clsx";
export default function MobileMenu({ openMobile }) {
  const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  const isLoggedIn = true;
  return (
    <div className={css.container}>
      <NavLink onClick={openMobile} to="/" className={getLinkStyles}>
        Recipes
      </NavLink>
      {isLoggedIn ? (
        <UserMenuMobile openMobile={openMobile} />
      ) : (
        <AuthNavMobile openMobile={openMobile} />
      )}
    </div>
  );
}
