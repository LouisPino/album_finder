import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Albums from "./pages/Albums";

function App() {
  return (
    <div className="App">
      <div className="routes">
        <BrowserRouter>

          <Routes>
            <Route exact path="/albums" element={<Albums />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
