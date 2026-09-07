import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {

  const isLoggedIn =
    localStorage.getItem(
      "adminLoggedIn"
    ) === "true";

  return isLoggedIn
    ? children
    : <Navigate to="/admin/login" />;
}

export default PrivateRoute;