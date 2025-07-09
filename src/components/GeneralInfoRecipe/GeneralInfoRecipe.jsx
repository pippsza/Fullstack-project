import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import css from "./GeneralInfoRecipe.module.css";
import Svg from "../Svg/svg";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import {
  deleteFavouriteRecipe,
  addFavouriteRecipe,
} from "../../redux/recipes/operations";

export default function GeneralInfoRecipe({
  category,
  time,
  calories,
  id,
  isFavourite = false,
}) {
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(isFavourite);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    setIsFav(isFavourite);
  }, [isFavourite]);

  const handleToggle = async () => {
    if (!isLoggedIn) {
      toast("Please login to save recipes");
      navigate("/login");
      return;
    }
    setLoading(true);

    try {
      if (isFav) {
        await dispatch(deleteFavouriteRecipe(id)).unwrap();
        toast.success("Recipe removed from favorites");
        setIsFav(false);
      } else {
        await dispatch(addFavouriteRecipe(id)).unwrap();
        toast.success("Recipe added to favorites");
        setIsFav(true);
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.generalBox}>
      <div className={css.generalInfo}>
        <h3 className={css.recipeTitle}>General informations</h3>
        <p className={css.infoText}>
          Category:
          <span className={css.text}>{category}</span>
        </p>
        <p className={css.infoText}>
          Cooking time:
          <span className={css.text}>{time} minutes</span>
        </p>
        <p className={css.infoText}>
          Caloric content:
          <span className={css.text}>
            Approximately {calories || "-"} kcal per serving
          </span>
        </p>
      </div>
      <button className={css.saveBtn} onClick={handleToggle} disabled={loading}>
        {loading ? "Loading..." : isFav ? "Remove" : "Save"}
        <Svg styles={css.icon} name="bookmark" />
      </button>
    </div>
  );
}
