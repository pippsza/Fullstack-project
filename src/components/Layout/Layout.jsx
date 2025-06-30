
import Header from "../Header/Header.jsx";
import css from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Footer from "../footer/footer.jsx";
export default function Layout() {
  return (
    <div className={css.container}>
      <Header></Header>
      <main>
        <Outlet />

      </main>
      <Footer></Footer>
    </div>
  );
};