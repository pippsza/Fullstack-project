import css from "./logout.module.css";
import sprite from "../../assets/svg/sprite.svg?url";
import Svg from "../Svg/svg.jsx";
export default function Logout({ openMobile }) {
  const userName = "Max";
  const cutUserName = () => {
    return userName[0];
  };

  const logoutHandler = () => {
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
