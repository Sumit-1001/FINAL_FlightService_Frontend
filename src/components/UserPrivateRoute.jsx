import { Navigate } from "react-router-dom";

function UserPrivateRoute({
  children
}) {

  const user =
    localStorage.getItem("user");

  return user
    ? children
    : (
      <Navigate
        to="/user/login"
        replace
      />
    );
}

export default UserPrivateRoute;