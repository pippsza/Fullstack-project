import AppBar from "../AppBar/AppBar.jsx";
import css from "./Header.module.css";
import Container from "../container/container.jsx";
import Headroom from "react-headroom";
import Logo from "../logo/logo.jsx";
import { useState } from "react";
import Burger from "../burger/burger.jsx";
import MobileMenu from "../mobileMenu/MobileMenu.jsx";
export default function Header({ openMobile, isOpened }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const mobileMenuHandler = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };
  return (
    <>
      <Headroom>
        <header className={css.background}>
          <Container>
            <div className={css.container}>
              <Logo />
              {isMobile ? (
                <Burger
                  isOpened={isMobileMenuOpened}
                  openMobile={mobileMenuHandler}
                />
              ) : (
                <AppBar />
              )}
            </div>
          </Container>
        </header>
        {isMobileMenuOpened ? <MobileMenu /> : null}
      </Headroom>
    </>
  );
}
