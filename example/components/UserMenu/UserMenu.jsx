import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";
import { logOut } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";
import clsx from "clsx";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };
  const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <>
      <nav className={css.nav}>
        <ul className={css.list}>
          <li>
            <NavLink to="/" className={getLinkStyles}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacts" className={getLinkStyles}>
              Contacts
            </NavLink>
          </li>
        </ul>
      </nav>

      <p className={css.username}>Welcome, {user.name}</p>
      <button type="button" className={css.button} onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
