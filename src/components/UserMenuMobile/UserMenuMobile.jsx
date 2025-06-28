// import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import css from "./UserMenuMobile.module.css";
import clsx from "clsx";
import Logout from "../logout/logout.jsx";

export default function UserMenuMobile() {
  const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <>
      <nav>
        <NavLink to="/profile/own" className={getLinkStyles}>
          My profile
        </NavLink>
      </nav>

      <Logout />
      <nav>
        <NavLink to="/add-recipe" className={css.addRecepy}>
          Add Recepy
        </NavLink>
      </nav>
    </>
  );
}
