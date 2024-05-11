import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../AppContext";

const ProtectedRoutes = () => {
  const { token } = useAppContext();

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
