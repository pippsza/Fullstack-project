import { Navigate } from "react-router-dom";

export default function PrivateRoute({ component, redirectTo }) {
  const isLoggedIn = null;

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}
