import AppBar from "../AppBar/AppBar.jsx";
import css from "./Header.module.css";
export default function Header() {
  return (
    <div className={css.background}>
      <div>
        <h1>svg</h1>
        <h1>Tasteorama </h1>
      </div>
      <AppBar></AppBar>
    </div>
  );
}
