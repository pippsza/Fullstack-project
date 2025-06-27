import sprite from "../../assets/svg/sprite.svg?url";
import css from "./burger.module.css";
export default function Burger({ openMobile, isOpened }) {
  return (
    <>
      {isOpened ? (
        <svg onClick={openMobile} className={css.svg}>
          <use href={`${sprite}#icon-burger`}></use>
        </svg>
      ) : (
        <svg onClick={openMobile} className={css.svgCross}>
          <use href={`${sprite}#icon-mobileCross`}></use>
        </svg>
      )}
    </>
  );
}
