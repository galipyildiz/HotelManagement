import { ScopedCssBaseline } from "@mui/material"; //normalize.css It fixes some inconsistencies across browsers
import "./App.css";
import Button from "@mui/material/Button";

function App() {
  return (
    <ScopedCssBaseline>
      <header>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button onClick={(e) => console.log(e)} variant="contained">
          Hello world
        </Button>
      </header>
    </ScopedCssBaseline>
  );
}

export default App;
