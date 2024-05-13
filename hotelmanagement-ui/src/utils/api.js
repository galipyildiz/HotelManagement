import axios from "axios";
import { useAppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const useInterceptor = () => {
  const { token, removeToken } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [token]);

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        removeToken();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
};

export { api, useInterceptor };
