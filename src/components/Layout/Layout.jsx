// import { useState } from "react";
// import Header from "../Header/Header.jsx";
// import css from "./Layout.module.css";
// import { Outlet } from "react-router-dom";

// export default function Layout() {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   return (
//     <div className={css.container}>
//       <Header></Header>
//       <main>
//         <Outlet></Outlet>
//       </main>
//     </div>
//   );
// }

import { Suspense } from 'react';

import css from './Layout.module.css';
import Header from '../Header/Header';
// import { Toaster } from 'react-hot-toast';

export default function Layout ({ children }) {
  return (
    <div>
     <Header/>
      <main className={css.pageContainer}>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </div>
  );
};