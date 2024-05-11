import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import MiniDrawer from "../layout/MiniDrawer";

const ProtectedRoutes = () => {
  const { token } = useAppContext();

  return token ? <MiniDrawer /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
