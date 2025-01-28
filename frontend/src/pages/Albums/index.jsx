import { getAlbums } from "../../utilities/album-service";
import { useEffect, useState } from "react";
import AlbumCard from "../../components/AlbumCard";
import("./albums.css")


export default function Albums() {
  const [albums, setAlbums] = useState(null);
  const [filters, setFilters] = useState(null)
  const categories = ["noise", "acoustic", "ambient", "improvisation"]


  useEffect(() => {
    handleRequest()
    let newFilters = categories.reduce((acc, cat) => {
      acc[cat] = true
      return acc;
    }, {})
    setFilters(newFilters)
  }, [])


  const categoryEls = filters ? categories.map((cat) => (
    <>
      <input onClick={handleTick} value={cat} type="checkbox" checked={filters[cat]}></input>
      <label>{cat}</label>
    </>
  )) : ""


  async function handleRequest() {
    const albumsResp = await getAlbums()
    if (albumsResp.length) {
      setAlbums(albumsResp);
    }
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
      <AlbumCard album={album} />
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
      "LOADING"
    </>
  )
}
