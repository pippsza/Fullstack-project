import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

import Navigation from "../Navigation/Navigation";


import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./AppBar.module.css";


export default function AppBar() {
  const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  const isLoggedIn = useSelector(selectIsLoggedIn);
  
  

  return (
    <div className={css.container}>
      <nav>
        <NavLink to="/" className={getLinkStyles}>
          Recipes
        </NavLink>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </nav>
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>

  );
}
