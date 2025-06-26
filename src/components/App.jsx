import css from "./App.module.css";
import Layout from "../components/Layout/Layout.jsx";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const AuthPage = lazy(() => import(`../pages/AuthPage.jsx`));
const AddRecipePage = lazy(() => import(`../pages/AddRecipePage.jsx`));
const ProfilePage = lazy(() => import(`../pages/ProfilePage.jsx`));
const RecipeViewPage = lazy(() => import(`../pages/RecipeViewPage.jsx`));
const RestrictedRoute = lazy(() => import(`./RestrictedRoute`));

export default function App() {
  return (
    <Layout>
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
      <div className={css.mainApp}>
        <Suspense fallback={<span className={css.loader}></span>}>
          <Routes>
            <Route path="/" element={<h1>Homepage</h1>}></Route>
            <Route
              path="/auth/:authType"
              element={
                <RestrictedRoute
                  component={<AuthPage></AuthPage>}
                  redirectTo="/"
                />
              }
            />
            <Route
              path="/recipes/:id"
              element={<RecipeViewPage></RecipeViewPage>}
            ></Route>
            <Route
              path="/add-recipe"
              element={<AddRecipePage></AddRecipePage>}
            ></Route>
            <Route
              path="/profile/:recipeType"
              element={<ProfilePage></ProfilePage>}
            ></Route>
            <Route path="*" element={<h1>not found</h1>}></Route>
          </Routes>
        </Suspense>
      </div>
    </Layout>
  );
}
