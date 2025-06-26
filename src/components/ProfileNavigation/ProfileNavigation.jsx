import { NavLink } from "react-router";
import style from './ProfileNavigation.module.css'

export default function ProfileNavigation() {
    return (<>
        <nav>
            <ul className={style.list}>
                <li><NavLink to='/profile/own'>
                My Recipes
                </NavLink></li>
                <li><NavLink to='/profile/favourites'>
                Saved Recipes
                </NavLink></li>
            </ul>
            
            
        </nav>
    </>)
}