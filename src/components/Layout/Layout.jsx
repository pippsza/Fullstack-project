import Header from "../Header/Header.jsx";
import css from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Footer from "../footer/footer.jsx";
import ModalMenuLogout from "../modalMenuLogout/modalMenuLogout.jsx";
import { useState } from "react";
export default function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlerModalMenu = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className={css.container}>
      {isModalOpen && <ModalMenuLogout isModalOpen={isModalOpen} />}
      <Header toggleModal={handlerModalMenu} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
