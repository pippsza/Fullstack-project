import AppBar from "../AppBar/AppBar.jsx";
import css from "./Header.module.css";
import Container from "../container/container.jsx";

import Logo from "../logo/logo.jsx";
import { useState } from "react";
import Burger from "../burger/burger.jsx";
export default function Header({ openMobile, isOpened }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  return (
    <header className={css.background}>
      <Container>
        <div className={css.container}>
          <Logo></Logo>
          {isMobile ? (
            <Burger isOpened={isOpened} openMobile={openMobile}></Burger>
          ) : (
            <AppBar></AppBar>
          )}
        </div>
      </Container>
    </header>
  );
}
