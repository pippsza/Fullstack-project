import css from "./AppBar.module.css";
import { useSelector } from "react-redux";
import UserMenu from "../UserMenu/UserMenu";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import AuthNav from "../../../src/components/AuthNav/AuthNav";
export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={css.header}>
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
