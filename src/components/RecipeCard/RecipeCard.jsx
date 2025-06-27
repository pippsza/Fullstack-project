import style from "./RecipeCard.module.css"

export default function RecipeCard() {
    return (
        < >
            <img className={style.img} src="" alt="recipe" />
            <div className={style.titleWrapper}>
                <h2 className={style.title}>Title</h2>
                <div className={style.svgWrapper}>
                    <p>svg</p>
                    <p>m</p>
                </div>
            </div>
            <span className={style.text}>Fluffy pancakes served with maple syrup and fresh berries.<br/> <br/><p>cal</p></span>
            <div>
                <button>Learn more</button>
                <div>
                <p>s</p>
                </div>
            </div>
        </>
    )
}