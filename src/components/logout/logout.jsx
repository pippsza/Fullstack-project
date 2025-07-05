import css from "./logout.module.css";
import Svg from "../Svg/svg.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
import { logOut } from "../../redux/auth/operations.js";
export default function Logout({
  openMobile = () => {
    return null;
  },
}) {
  const userName = useSelector(selectUser);
  const cutUserName = () => {
    if (!userName || userName.length === 0) return "";
    return userName[0];
  };
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logOut());
    console.log("Nothing here for now.");
    openMobile();
  };

  return (
    <div className={css.container}>
      <div className={css.nameWrapper}>
        <div className={css.icon}>
          <p className={css.name}>{cutUserName()}</p>
        </div>
        <p className={css.name}>{userName}</p>
      </div>
      <div className={css.stick}></div>
      <Svg styles={css.svg} onClick={logoutHandler} name="exit"></Svg>
    </div>
  );
}
