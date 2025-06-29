import { useDispatch, useSelector } from "react-redux";

import { Toaster } from "react-hot-toast";
import { lazy, useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors.js";

import Layout from "../components/Layout/Layout.jsx";
import MainPage from "../pages/MainPage.jsx";
import Loader from "../components/Loader/Loader";

const AuthPage = lazy(() => import(`../pages/AuthPage.jsx`));
const AddRecipePage = lazy(() => import(`../pages/AddRecipePage.jsx`));
const ProfilePage = lazy(() => import(`../pages/ProfilePage.jsx`));
const RecipeViewPage = lazy(() => import(`../pages/RecipeViewPage.jsx`));
const RestrictedRoute = lazy(() => import(`./RestrictedRoute.jsx`));
const PrivateRoute = lazy(() => import(`./PrivateRoute.jsx`));

const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../pages/RegistrationPage/RegistrationPage.jsx")
);
const PrivatePage = lazy(() => import("../pages/PrivatePage/PrivatePage.jsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

// import css from "./App.module.css";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/auth/login"
              element={
                <RestrictedRoute
                  redirectTo="/private"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="/auth/register"
              element={
                <RestrictedRoute
                  redirectTo="/private"
                  component={<RegistrationPage />}
                />
              }
            />
            <Route
              path="/private"
              element={<PrivateRoute component={<PrivatePage />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      )}
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: "white",
            color: "black",
            border: "black solid 2px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          },
        }}
      />
    </>
  );
}

// export default function App() {
//   return (
//     <>
//       <Toaster
//         toastOptions={{
//           duration: 3000,
//           style: {
//             background: "white",
//             color: "black",
//             border: "black solid 2px",
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
//           },
//         }}
//       />
//       <div className={css.mainApp}>
//         <Suspense fallback={<span className={css.loader}></span>}>
//           <Routes>
//             <Route path="/" element={<Layout />}>
//               <Route index element={<MainPage />} />

//               <Route
//                 path="auth/:authType"
//                 element={
//                   <AuthPage />
//                   // <RestrictedRoute component={<AuthPage />} redirectTo="/" />
//                 }
//               />

//               <Route
//                 path="add-recipe"
//                 element={
//                   <AddRecipePage />
//                   // <PrivateRoute
//                   //   component={<AddRecipePage />}
//                   //   redirectTo="/auth/login"
//                   // />
//                 }
//               />

//               <Route
//                 path="profile/:recipeType"
//                 element={
//                   <ProfilePage />
//                   // <PrivateRoute
//                   //   component={<ProfilePage />}
//                   //   redirectTo="/auth/login"
//                   // />
//                 }
//               />

//               <Route path="recipes/:id" element={<RecipeViewPage />} />

//               <Route
//                 path="*"
//                 element={<h1 style={{ color: "black" }}>not found</h1>}
//               />
//             </Route>
//           </Routes>
//         </Suspense>
//       </div>
//     </>
//   );
// }
