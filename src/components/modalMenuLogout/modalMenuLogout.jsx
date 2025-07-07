import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Svg from "../Svg/svg";
import style from "./modalMenuLogout.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations.js";
import { toast } from "react-hot-toast";

export default function ModalMenuLogout({ isModalOpen, onClose }) {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      await dispatch(logOut()).unwrap();
      onClose();
      toast.success("Logout successful! 👋");
    } catch (e) {
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <>
      <div className={style.backdrop}>
        <div className={style.modal} onClick={(e) => e.stopPropagation()}>
          <Svg styles={style.svg} onClick={onClose} name="cross" />
          <h2 className={style.title}>Are you shure?</h2>
          <p className={style.text}>We will miss you!</p>
          <ul className={style.list}>
            <li className={style.link} onClick={logoutHandler}>
              Log out
            </li>
            <li className={style.link} onClick={onClose}>
              Cancel
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
