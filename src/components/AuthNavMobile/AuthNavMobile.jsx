import { NavLink } from "react-router-dom";
import css from "./AuthNavMobile.module.css";
import clsx from "clsx";
export default function AuthNavMobile() {
  const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <>
      <div>
        <ul>
          <li>
            <NavLink className={getLinkStyles} to="/auth/login">
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink className={getLinkStyles} to="/auth/register">
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
