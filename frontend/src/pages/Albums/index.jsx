import { getAlbums } from "../../utilities/album-service";
import { useEffect, useState } from "react";
import AlbumCard from "../../components/AlbumCard";
import("./albums.css")


export default function Albums({ user }) {
  const [albums, setAlbums] = useState(null);
  const [filters, setFilters] = useState(null)
  const categories = ["noise", "ambient", "improvisation", "acoustic", "electronic", "vocal", "live performance"]

  useEffect(() => {
    handleRequest()
    let newFilters = categories.reduce((acc, cat) => {
      acc[cat] = true
      return acc;
    }, {})
    setFilters(newFilters)
  }, [])

  useEffect(() => {
    const albumsHeaderEl = document.getElementById("albums-header");

    if (albumsHeaderEl) {
      const handleShuffle = () => shuffleAlbums();
      albumsHeaderEl.addEventListener("click", handleShuffle);
      return () => {
        albumsHeaderEl.removeEventListener("click", handleShuffle);
      };
    }
  }, []);
  const categoryEls = filters ? categories.map((cat) => (
    <div className="filter-category">
      <input onClick={handleTick} value={cat} type="checkbox" checked={filters[cat]}></input>
      <label>{toTitleCase(cat)}</label>
    </div>
  )) : ""

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function shuffleAlbums() {
    setAlbums(prevAlbums => {
      let tempAlbums = [...prevAlbums];
      shuffleArray(tempAlbums);
      return tempAlbums;
    });
  }


  async function handleRequest() {
    const albumsResp = await getAlbums()
    if (albumsResp.length) {
      shuffleArray(albumsResp)
      setAlbums(albumsResp)
    }
  }

  function toTitleCase(str) {
    return str
      .toLowerCase() // Convert the whole string to lowercase first
      .split(' ') // Split the string into an array of words
      .map(word => {
        // Capitalize the first letter and keep the rest lowercase
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' '); // Join the words back into a single string
  }

  function handleTick(e) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.value]: !prevFilters[e.target.value], // Toggle the value for the category
    }));
  }

  const albumsEls = albums?.filter((album) => {
    const currentCats = Object.keys(filters).filter((filter) => (filters[filter]))
    for (let cat of album.categories) {
      if (currentCats.includes(cat)) {
        return album
      }
    }
  }).map((album) => {
    return (
      <AlbumCard album={album} user={user} />
    )
  })




  return (albums ?
    <section className="albums-page">
      <div className="filter-div">
        <p className="filter-title">Filters: </p>
        <div className="filters">
          {categoryEls}
        </div>
      </div>
      <div className="albums">
        {albumsEls}
      </div>
    </section>
    : <>
      <h4 className="loading">HACKIN' A DART BE RIGHT BACK</h4>
    </>
  )
}
