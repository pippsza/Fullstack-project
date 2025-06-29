import { Outlet } from "react-router-dom";
import Container from "../../components/container/container.jsx";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation.jsx";
import ModalErrorWhileSaving from "../../components/ModalErrorWhileSaving/ModalErrorWhileSaving.jsx";
import { useState } from "react";

import style from "./ProfilePage.module.css";

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = (e) => {
    setIsModalOpen(false);
  };
  return (
    <div className={style.wrapper}>
      {isModalOpen && <ModalErrorWhileSaving onClose={onClose} />}
      <Container>
        <h1 className={style.title}>Profile page</h1>
        <ProfileNavigation />
        <Outlet />
      </Container>
    </div>
  );
}
