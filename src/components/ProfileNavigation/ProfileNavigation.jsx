import { NavLink } from "react-router-dom";
import css from './ProfileNavigation.module.css'

import clsx from "clsx";

export default function ProfileNavigation() {
    const getLinkStyles = ({ isActive }) => {
        return clsx(css.link, isActive && css.active);
      };
    return (<>
        <nav>
            <ul className={css.list}>
                <li><NavLink className={getLinkStyles} to='/profile/own'>
                My Recipes
                </NavLink></li>
                <li><NavLink className={getLinkStyles} to='/profile/favourite'>
                Saved Recipes
                </NavLink></li>
            </ul>
            
            
        </nav>
    </>)
}