import { NavLink, useParams } from "react-router-dom";
import style from "./RecipeCard.module.css";
import sprite from "../../assets/svg/sprite.svg?url";

export default function RecipeCard({ recipeCard }) {
  const { recipeType } = useParams();
  return (
    <>
      <img className={style.img} src={recipeCard.thumb} alt="recipe" />
      <div className={style.titleWrapper}>
        <h2 className={style.title}>{recipeCard.title}</h2>
        <div className={style.svgWrapper}>
          <svg className={style.svg}>
            <use href={`${sprite}#icon-clock`}></use>
          </svg>
          <p className={style.minutes}>{recipeCard.time}</p>
        </div>
      </div>
      <p className={style.text}>{recipeCard.description}</p>
      {!recipeCard.time ? (
        <p className={style.text1}>-</p>
      ) : (
        <p className={style.text1}>~{recipeCard.time} cal</p>
      )}
      <div className={style.btnWrapper}>
        <NavLink
          className={style.learnMoreBtn}
          to={`/recipes/${recipeCard._id.$oid}`}
        >
          Learn more
        </NavLink>
        {recipeType === "own" ? null : recipeType === "favourites" ? (
          <div className={style.svg1WrapperActive}>
            <svg className={style.svg1Active}>
              <use href={`${sprite}#icon-bookmark`}></use>
            </svg>
          </div>
        ) : (
          <div className={style.svg1Wrapper}>
            <svg className={style.svg1}>
              <use href={`${sprite}#icon-bookmark`}></use>
            </svg>
          </div>
        )}
      </div>
    </>
  );
}
