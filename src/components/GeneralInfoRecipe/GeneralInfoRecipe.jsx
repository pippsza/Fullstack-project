import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import css from "./GeneralInfoRecipe.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

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
      Toaster.info("Please login to save recipes");
      navigate("/login");
      return;
    }
    setLoading(true);

    try {
      if (isFavourite) {
        await dispatch(removeFromFavorites(id)).unwrap();
        Toaster.success("Recipe added to favorites");
      } else {
        await dispatch(addToFavourites(id)).unwrap();
        Toaster.success("Recipe added to favorites");
      }
    } catch (err) {
      Toaster.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.generalBox}>
      <div className={css.generalInfo}>
        <h2 className={css.recipeTitle}></h2>
        <p className={css.infoText}>
          Category:
          <span className={css.text}>{category}</span>
        </p>
        <p className={css.infoText}>
          Cooking time:
          <span className={css.text}>{time}</span>
        </p>
        <p className={css.infoText}>
          Caloric content:
          <span className={css.text}>{calories}</span>
        </p>
      </div>
      <button onClick={handleToggle} disabled={loading}>
        {loading ? "Loading..." : isFavourite ? "Remove" : "Save"}
      </button>
    </div>
  );
}
