import AppBar from "../AppBar/AppBar.jsx";
import css from "./Header.module.css";
import Container from "../container/container.jsx";
import Logo from "../logo/logo.jsx";
import { useEffect, useState } from "react";
import Burger from "../burger/burger.jsx";
import MobileMenu from "../mobileMenu/MobileMenu.jsx";
import ScrollHeader from "../ScrollHeader/ScrollHeader.jsx";

export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const mobileMenuHandler = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleResize = () => {
      const isNowMobile = mediaQuery.matches;
      setIsMobile(isNowMobile);
      if (!isNowMobile && isMobileMenuOpened) {
        setIsMobileMenuOpened(false);
      }
    };
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [isMobileMenuOpened]);
  return (
    <>
      <ScrollHeader>
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
        {isMobileMenuOpened ? (
          <MobileMenu openMobile={mobileMenuHandler} />
        ) : null}
      </ScrollHeader>
    </>
  );
}
