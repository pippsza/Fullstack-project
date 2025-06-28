import Header from "../Header/Header.jsx";
import css from "./Layout.module.css";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className={css.container}>
      <Header></Header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
