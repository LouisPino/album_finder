import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";
import AddAlbum from "./pages/Albums/add_album";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import("./styles/footer.css");

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/albums" element={<Albums />} />
          <Route exact path="/albums/add" element={<AddAlbum />} />
          <Route exact path="/artists" element={<Artists />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
