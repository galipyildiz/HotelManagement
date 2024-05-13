import { createBrowserRouter } from "react-router-dom";
import SignInSide from "../../pages/SignInSide";
import SignUpSide from "../../pages/SignUpSide";
import NotFound from "../../pages/NotFound";
import Home from "../../pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import Buildings from "../../pages/Buildings";
import WorkOrders from "../../pages/WorkOrders";
import InventoryMovements from "../../pages/InventoryMovements";
import InventoryItems from "../../pages/InventoryItems";

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
      {
        path: "/buildings",
        element: <Buildings />,
      },
      {
        path: "/work-orders",
        element: <WorkOrders />,
      },
      {
        path: "/inventory-movements",
        element: <InventoryMovements />,
      },
      {
        path: "/inventory-items",
        element: <InventoryItems />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
