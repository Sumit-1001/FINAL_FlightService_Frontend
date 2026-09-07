import api from "./api";

const addUser = (user) => {
  return api.post("/api/public/addUser", user);
};

const loginUser = (credentials) => {
  return api.post(
    "/api/public/login",
    credentials
  );
};

export default {
  addUser,
  loginUser
};