// import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import css from "./UserMenuMobile.module.css";
import clsx from "clsx";
import Logout from "../logout/logout.jsx";

export default function UserMenuMobile({ openMobile }) {
  const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <>
      <NavLink onClick={openMobile} to="/profile/own" className={getLinkStyles}>
        My profile
      </NavLink>
      <Logout openMobile={openMobile} />
      <NavLink onClick={openMobile} to="/add-recipe" className={css.addRecepy}>
        Add Recepy
      </NavLink>
    </>
  );
}
