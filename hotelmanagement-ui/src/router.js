import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignInSide from "./pages/SignInSide";
import SignUpSide from "./pages/SignUpSide";
import NotFound from "./pages/NotFound";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
