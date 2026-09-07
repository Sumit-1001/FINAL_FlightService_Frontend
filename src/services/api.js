import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090"
});

api.interceptors.request.use((config) => {

  const auth = localStorage.getItem("auth");

  if (auth) {
    config.headers.Authorization =
      `Basic ${auth}`;
  }

  return config;
});

export default api;