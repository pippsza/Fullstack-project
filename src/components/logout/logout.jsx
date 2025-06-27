import css from "./logout.module.css";
import sprite from "../../assets/svg/sprite.svg?url";
export default function Logout() {
  const userName = "Max";
  const cutUserName = () => {};
  return (
    <div>
      <div></div>
      <p></p>
      <div></div>
      <svg className={css.svg}>
        <use href={`${sprite}#icon-exit`}></use>
      </svg>
    </div>
  );
}
