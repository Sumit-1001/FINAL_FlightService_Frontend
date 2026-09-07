import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { toast } from "react-toastify";

function UserLogin() {

  const [userName, setUserName] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const login = async () => {

    if (!userName || !password) {

      toast.error(
        "Username and Password are required"
      );

      return;
    }

    try {

      const response =
        await UserService.loginUser({

          userName,
          password

        });

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      toast.success(
        "Login Successful"
      );

      navigate("/flights");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Invalid Credentials"
      );

    }
  };

  return (

    <div className="container mt-5">

      <div className="card shadow">

        <div className="card-body">

          <h2>User Login</h2>

          <input
            className="form-control mb-3"
            placeholder="Username"
            value={userName}
            onChange={(e) =>
              setUserName(
                e.target.value
              )
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            className="btn btn-primary"
            onClick={login}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default UserLogin;