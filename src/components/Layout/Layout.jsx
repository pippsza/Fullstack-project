import { useState } from "react";
import Header from "../Header/Header.jsx";
import css from "./Layout.module.css";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  return (
    <div className={css.container}>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
