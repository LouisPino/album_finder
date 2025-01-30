import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";
import Artist from "./pages/Artists/show";
import AddAlbum from "./pages/Albums/add_album";
import EditAlbum from "./pages/Albums/edit_album";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import MyAlbums from "./pages/MyAlbums";
import Random from "./pages/Random";
import { useEffect, useState } from "react";
import("./styles/footer.css");
import("./App.css");

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <BrowserRouter>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route exact path="/" element={<Home user={user} />} />
          <Route exact path="/albums" element={<Albums user={user} />} />
          <Route exact path="/albums/add" element={<AddAlbum user={user} />} />
          <Route exact path="/albums/edit/:id" element={<EditAlbum user={user} />} />
          <Route exact path="/artists" element={<Artists user={user} />} />
          <Route exact path="/users/:email" element={<MyAlbums user={user} />} />
          <Route exact path="/random" element={<Random user={user} />} />
          <Route exact path="/artists/:artist" element={<Artist user={user} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
