import { ScopedCssBaseline } from "@mui/material"; //normalize.css It fixes some inconsistencies across browsers
import "./App.css";
import SignInSide from "./pages/SignInSide";
import Home from "./pages/Home";

function App() {
  
  const isLoggedIn = false;

  return (
    <ScopedCssBaseline>
      {isLoggedIn ? <Home /> : <SignInSide />}
    </ScopedCssBaseline>
  );
}

export default App;
