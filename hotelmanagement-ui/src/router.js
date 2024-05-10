import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignInSide from "./pages/SignInSide";
import SignUpSide from "./pages/SignUpSide";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <SignInSide />,
  },
  {
    path: "/register",
    element: <SignUpSide />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
