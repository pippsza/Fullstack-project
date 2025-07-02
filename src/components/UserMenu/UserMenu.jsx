import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../../redux/auth/operations";

import css from "./UserMenu.module.css";
import { selectUser } from "../../redux/auth/selectors";

import clsx from "clsx";
import Logout from "../logout/logout.jsx";

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("UserMenu rendered, user:", user);

  const handlelogout = () => dispatch(logOut());

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

// import css from "./UserMenu.module.css";

// export default function UserMenu() {
//   const getLinkStyles = ({ isActive }) => {
//     return clsx(css.link, isActive && css.active);
//   };
//   return (
//   );
// }
