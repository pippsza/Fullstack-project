import sprite from "../../assets/svg/sprite.svg?url";
import css from "./logo.module.css";
export default function Logo() {
  return (
    <a className={css.container} href="/">
      <svg className={css.svg}>
        <use href={`${sprite}#icon-logo`}></use>
      </svg>
      <p className={css.logoName}>Tasteorama </p>
    </a>
  );
}
