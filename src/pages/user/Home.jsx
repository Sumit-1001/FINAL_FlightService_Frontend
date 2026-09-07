import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="container">

      <div
        className="text-center"
        style={{ marginTop: "120px" }}
      >

        <h1 className="display-4 fw-bold">

          Flight Booking System

        </h1>

        <p className="lead text-muted">

          Search, Schedule and Book Flights Easily

        </p>

        <div className="mt-5">

          <Link
            to="/user/login"
            className="btn btn-primary btn-lg me-3"
          >
            User Login
          </Link>

          <Link
            to="/admin/login"
            className="btn btn-success btn-lg me-3"
          >
            Admin Login
          </Link>

          <Link
            to="/register"
            className="btn btn-outline-dark btn-lg"
          >
            Register
          </Link>

        </div>

      </div>

    </div>

  );
}

export default Home;