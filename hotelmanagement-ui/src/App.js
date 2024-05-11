import { useState } from "react";
import "./App.css";
import AppContext from "./utils/AppContext";
import router from "./utils/routes/router";
import { RouterProvider } from "react-router-dom";

function App() {
  const [token, setToken] = useState(sessionStorage["token"] || null);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
