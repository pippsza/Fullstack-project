import RecipeCard from "../RecipeCard/RecipeCard";
import style from "./RecipesList.module.css";

export default function RecipesList() {
     return (
        <ul className={style.list}>
            {/* {recipeCards.map(recipeCard => (
                <li key={recipeCard.id}>
                    <RecipeCard recipeCard={recipeCard} />
                </li>
            ))} */}
             <li className={style.item}><RecipeCard /></li>
             <li className={style.item}><RecipeCard /></li>
             <li className={style.item}><RecipeCard /></li>
             <li className={style.item}><RecipeCard /></li>
             <li className={style.item}><RecipeCard /></li>
             <li className={style.item}><RecipeCard /></li>
             <li className={style.item}><RecipeCard /></li>
             <li className={style.item}><RecipeCard /></li>
             <li className={style.item}><RecipeCard /></li>
             <li className={style.item}><RecipeCard /></li>
             <li className={style.item}><RecipeCard /></li>
             <li className={style.item}><RecipeCard/></li>
</ul>
    )
}
