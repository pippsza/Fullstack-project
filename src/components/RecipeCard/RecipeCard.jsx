import { NavLink, useParams } from "react-router-dom";
import Svg from "../Svg/svg";
import style from "./RecipeCard.module.css";

export default function RecipeCard({ recipeCard }) {
  const { recipeType } = useParams();
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
          to={`/recipes/${recipeCard._id.$oid}`}
        >
          Learn more
        </NavLink>
        {recipeType === "own" ? null : recipeType === "favourites" ? (
          <div className={style.svg1WrapperActive}>
            <Svg styles={style.svg1Active} name="bookmark" />
          </div>
        ) : (
          <div className={style.svg1Wrapper}>
            <Svg styles={style.svg1} name="bookmark" />
          </div>
        )}
      </div>
    </div>
  );
}
