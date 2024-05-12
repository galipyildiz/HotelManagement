import axios from "axios";
import { useAppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const useInterceptor = () => {
  const { token, updateToken } = useAppContext();
  const navigate = useNavigate();

  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        updateToken("");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
};

export { api, useInterceptor };
