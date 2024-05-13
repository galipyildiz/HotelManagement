import { AppProvider } from "./utils/AppContext";
import router from "./utils/routes/router";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
