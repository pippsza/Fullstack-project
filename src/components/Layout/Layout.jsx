import { useState } from "react";
import Header from "../Header/Header.jsx";
import css from "./Layout.module.css";

export default function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  return (
    <div className={css.container}>
      <Header></Header>
      {children}
    </div>
  );
}
