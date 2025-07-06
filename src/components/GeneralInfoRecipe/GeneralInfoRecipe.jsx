import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import css from "./GeneralInfoRecipe.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { deleteFavouriteRecipe } from "../../redux/recipes/operations";
import { addFavouriteRecipe } from "../../redux/recipes/operations";

export default function GeneralInfoRecipe({
  category,
  time,
  calories,
  id,
  isFavourite,
}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleToggle = async () => {
    if (!isLoggedIn) {
      toast.info("Please login to save recipes");
      navigate("/login");
      return;
    }
    setLoading(true);

    try {
      if (isFavourite) {
        await dispatch(deleteFavouriteRecipe(id)).unwrap();
        toast.success("Recipe added to favorites");
      } else {
        await dispatch(addFavouriteRecipe(id)).unwrap();
        toast.success("Recipe added to favorites");
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
        {loading ? "Loading..." : isFavourite ? "Remove" : "Save"}
      </button>
    </div>
  );
}
