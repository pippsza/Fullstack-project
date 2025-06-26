import AppBar from "../AppBar/AppBar.jsx";
import css from "./Header.module.css";
import Container from "../container/container.jsx";
export default function Header() {
  return (
    <div className={css.background}>
      <Container>
        <div>
          <h1>svg</h1>
          <h1>Tasteorama </h1>
        </div>
        <AppBar></AppBar>
      </Container>
    </div>
  );
}
