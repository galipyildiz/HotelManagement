import { ScopedCssBaseline } from "@mui/material"; //normalize.css It fixes some inconsistencies across browsers
import "./App.css";
import SignInSide from "./pages/SignInSide";

function App() {
  return (
    <ScopedCssBaseline>
      <SignInSide />
    </ScopedCssBaseline>
  );
}

export default App;
