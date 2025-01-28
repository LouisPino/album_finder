import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Albums from "./pages/Albums";
import AddAlbum from "./pages/Albums/add_album";
import Footer from "./components/Footer";
import("./styles/footer.css");

function App() {
  return (
    <div className="App">
      <div className="routes">
        <BrowserRouter>

          <Routes>
            <Route exact path="/albums" element={<Albums />} />
            <Route exact path="/albums/add" element={<AddAlbum />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
