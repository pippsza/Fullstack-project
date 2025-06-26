import { Navigate } from "react-router-dom";

export default function RestrictedRoute({ component, redirectTo }) {
  const isLoggedIn = null;

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
}
