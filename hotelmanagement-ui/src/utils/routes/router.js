import { createBrowserRouter } from "react-router-dom";
import SignInSide from "../../pages/SignInSide";
import SignUpSide from "../../pages/SignUpSide";
import NotFound from "../../pages/NotFound";
import Home from "../../pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";

export default createBrowserRouter([
  {
    path: "/login",
    element: <SignInSide />,
  },
  {
    path: "/register",
    element: <SignUpSide />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
