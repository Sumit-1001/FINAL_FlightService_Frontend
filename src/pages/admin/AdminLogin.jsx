import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import api from "../../services/api";

function AdminLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const login = async () => {

  if (!username || !password) {

    toast.error(
      "Username and Password are required"
    );

    return;

  }

  try {

    const token = btoa(
      username + ":" + password
    );

    localStorage.setItem(
      "auth",
      token
    );

    await await api.get("/flights/validate");

    localStorage.setItem(
      "adminLoggedIn",
      "true"
    );

    toast.success(
      "Login Successful"
    );

    navigate("/admin/dashboard");

  } catch (error) {

    localStorage.removeItem(
      "auth"
    );

    localStorage.removeItem(
      "adminLoggedIn"
    );

    toast.error(
      "Invalid Username or Password"
    );

  }

};


  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-5">

            <div className="card shadow">

              <div className="card-body">

                <h2 className="text-center mb-4">
                  Admin Login
                </h2>

                <div className="mb-3">

                  <label className="form-label">
                    Username
                  </label>

                  <input
                    className="form-control"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                </div>

                <button
                  className="btn btn-primary w-100"
                  onClick={login}
                >
                  Login
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default AdminLogin;