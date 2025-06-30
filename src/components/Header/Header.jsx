import AppBar from "../AppBar/AppBar.jsx";
import Logo from "../Logo/Logo.jsx";
import css from "./Header.module.css";
import Container from "../container/container.jsx";

export default function Header() {
  return (
    <div className={css.background}>
      <Container>
        <Logo />
        <AppBar />
      </Container>
    </div>
  );
}
