import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin =
    localStorage.getItem(
      "adminLoggedIn"
    ) === "true";

  const logout = () => {

    localStorage.removeItem("auth");

    localStorage.removeItem(
      "adminLoggedIn"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/");
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">

      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          Flight Booking
        </Link>

        <div className="navbar-nav me-auto">

          {/* Guest */}

          {!user && !isAdmin && (
            <>
              <Link
                className="nav-link"
                to="/"
              >
                Home
              </Link>

              <Link
                className="nav-link"
                to="/user/login"
              >
                User Login
              </Link>

              <Link
                className="nav-link"
                to="/admin/login"
              >
                Admin Login
              </Link>

              <Link
                className="nav-link"
                to="/register"
              >
                Register
              </Link>
            </>
          )}

          {/* User */}

          {user && !isAdmin && (
            <>
              <Link
                className="nav-link"
                to="/flights"
              >
                Flights
              </Link>
            </>
          )}

          {/* Admin */}

          {isAdmin && (
            <>
              <Link
                className="nav-link"
                to="/admin/dashboard"
              >
                Dashboard
              </Link>

              <Link
                className="nav-link"
                to="/admin/flights"
              >
                Flights
              </Link>

              <Link
                className="nav-link"
                to="/admin/schedules"
              >
                Schedules
              </Link>

              <Link
                className="nav-link"
                to="/admin/seats"
              >
                Seats
              </Link>
            </>
          )}

        </div>

        {(user || isAdmin) && (

          <div className="d-flex align-items-center">

            <span className="text-white me-3">

              Welcome,
              {" "}
              {isAdmin
                ? "Admin"
                : user?.userName}

            </span>

            <button
              className="btn btn-danger btn-sm"
              onClick={logout}
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </nav>

  );
}

export default Navbar;