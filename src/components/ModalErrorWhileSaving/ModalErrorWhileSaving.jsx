import sprite from "../../assets/svg/sprite.svg?url";
import { NavLink } from "react-router-dom";

import style from "./ModalErrorWhileSaving.module.css";

export default function ModalErrorWhileSaving({ onClose }) {
  return (
    <>
      <div className={style.backdrop}>
        <div className={style.modal} onClick={(e) => e.stopPropagation()}>
          <svg className={style.svg} onClick={onClose}>
            <use href={`${sprite}#icon-cross`}></use>
          </svg>

          <h2 className={style.title}>Error while saving</h2>
          <p className={style.text}>
            To save this recipe, you need to authorize first
          </p>
          <ul className={style.list}>
            <li>
              <NavLink className={style.link} to="/auth/login" onClick={onClose}>
                Log in
              </NavLink>
            </li>
            <li>
              <NavLink className={style.link} to="/auth/register" onClick={onClose}>
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
