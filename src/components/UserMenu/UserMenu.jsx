// import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import css from "./UserMenu.module.css";
import clsx from "clsx";
import Logout from "../logout/logout.jsx";

export default function UserMenu() {
  const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <>
      <nav>
        <ul className={css.list}>
          <li>
            <NavLink to="/profile/own" className={getLinkStyles}>
              My profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-recipe" className={css.button}>
              Add Recepy
            </NavLink>
          </li>
        </ul>
      </nav>

      <Logout />
    </>
  );
}
