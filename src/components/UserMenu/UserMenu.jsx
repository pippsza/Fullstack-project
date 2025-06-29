import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/auth/operations";

import css from "./UserMenu.module.css";
import { selectUser } from "../../redux/auth/selectors";

import clsx from "clsx";

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function UserMenu() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogOut = () => dispatch(logout());

  return (
    <div className={css.wrapper}>
      <>
        <nav>
          <ul>
            <li>
              <NavLink to="/profile/own" className={getLinkStyles}>
                My profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-recipe" className={getLinkStyles}>
                Add Recepy
              </NavLink>
            </li>
          </ul>
        </nav>

        <p>profile icon + button exit </p>
      </>
      {user && <p className={css.username}>Welcome, {user.name}</p>}
      <button className={css.btn} type="button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}

// import css from "./UserMenu.module.css";

// export default function UserMenu() {
//   const getLinkStyles = ({ isActive }) => {
//     return clsx(css.link, isActive && css.active);
//   };
//   return (
//   );
// }
