import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Svg from "../Svg/svg";
import style from "./RecipeCard.module.css";
import { useDispatch } from "react-redux";
import {
  deleteFavouriteRecipe,
  addFavouriteRecipe,
} from "../../redux/recipes/operations";

export default function RecipeCard({ recipeCard }) {
  const dispatch = useDispatch();
  const { recipeType } = useParams();

  const handleDeleteFavourite = async () => {
    console.log("ID to delete:", recipeCard._id);
    try {
      if (recipeCard._id) {
        await dispatch(deleteFavouriteRecipe(recipeCard._id)).unwrap();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleAddFavourite = async () => {
    console.log("ID to Add:", recipeCard._id);
    try {
      if (recipeCard._id) {
        await dispatch(addFavouriteRecipe(recipeCard._id)).unwrap();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className={style.recipeCardWrapper}>
      <img className={style.img} src={recipeCard.thumb} alt="recipe" />
      <div className={style.titleWrapper}>
        <h2 className={style.title}>{recipeCard.title}</h2>
        <div className={style.svgWrapper}>
          <Svg styles={style.svg} name="clock" />
          <p className={style.minutes}>{recipeCard.time}</p>
        </div>
      </div>
      <div className={style.textWrapper}>
        <p className={style.text}>{recipeCard.description}</p>
        {!recipeCard.time ? (
          <p className={style.text1}>-</p>
        ) : (
          <p className={style.text1}>~{recipeCard.time} cal</p>
        )}
      </div>
      <div className={style.btnWrapper}>
        <NavLink
          className={style.learnMoreBtn}
          to={`/recipes/${recipeCard._id}`}
        >
          Learn more
        </NavLink>
        {recipeType === "own" ? null : recipeType === "favourites" ? (
          <div className={style.svg1WrapperActive}>
            <Svg
              styles={style.svg1Active}
              name="bookmark"
              onClick={handleDeleteFavourite}
            />
          </div>
        ) : (
          <div className={style.svg1Wrapper}>
            <Svg
              styles={style.svg1}
              name="bookmark"
              onClick={handleAddFavourite}
            />
          </div>
        )}
      </div>
    </div>
  );
}
