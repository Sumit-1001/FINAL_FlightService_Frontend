import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center mt-5">

      <h1 className="display-1 text-danger">
        404
      </h1>

      <h3>Page Not Found</h3>

      <Link
        to="/"
        className="btn btn-primary"
      >
        Go Home
      </Link>

    </div>
  );
}

// function NotFound() {
//   return <h1>404 WORKING</h1>;
// }



export default NotFound;