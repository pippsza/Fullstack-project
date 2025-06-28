import css from "./logout.module.css";
import sprite from "../../assets/svg/sprite.svg?url";
export default function Logout() {
  const userName = "Max";
  const cutUserName = () => {};
  return (
    <div className={css.container}>
      <div>
        <div className={css.icon}></div>
        <p className={css.name}>{userName}</p>
      </div>
      <div className={css.stick}></div>
      <svg className={css.svg}>
        <use href={`${sprite}#icon-exit`}></use>
      </svg>
    </div>
  );
}
