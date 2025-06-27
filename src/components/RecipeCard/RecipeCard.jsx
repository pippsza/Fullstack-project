import style from "./RecipeCard.module.css";
import sprite from "../../assets/svg/sprite.svg?url";

export default function RecipeCard() {
    return (
        < >
            <img className={style.img} src="" alt="recipe" />
            <div className={style.titleWrapper}>
                <h2 className={style.title}>Title</h2>
                <div className={style.svgWrapper}>
                <svg className={style.svg}>
        <use href={`${sprite}#icon-clock`}></use>
      </svg>
                    <p className={style.minutes}>m</p>
                </div>
            </div>
            <p className={style.text}>Fluffy pancakes served with maple syrup and fresh berries.</p><p className={style.text1}>~cal</p >
            <div className={style.btnWrapper}>
                <button className={style.btn}>Learn more</button>
                <div className={style.svg1Wrapper}>
                <svg className={style.svg1}>
        <use href={`${sprite}#icon-bookmark`}></use>
      </svg>
                </div>
            </div>
        </>
    )
}