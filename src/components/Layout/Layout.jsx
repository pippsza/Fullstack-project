import { useState } from "react";
import Header from "../Header/Header.jsx";
import css from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import MobileMenu from "../mobileMenu/MobileMenu.jsx";

export default function Layout() {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const mobileMenuHandler = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };
  return (
    <div className={css.container}>
      <Header
        isOpened={isMobileMenuOpened}
        openMobile={mobileMenuHandler}
      ></Header>
      <main>
        {isMobileMenuOpened ? <MobileMenu /> : null}
        <Outlet />
      </main>
    </div>
  );
}
