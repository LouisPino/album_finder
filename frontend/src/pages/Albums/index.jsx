import { getAlbums } from "../../utilities/album-service";
import { useEffect, useState } from "react";



export default function Albums() {
  const [albums, setAlbums] = useState(null);


  useEffect(() => {
    console.log("albums: ", albums)
  }, [albums])


  async function handleRequest() {
    const albumsResp = await getAlbums()
    if (albumsResp.length) {
      setAlbums(albumsResp);
    }
  }

  const albumsEls = albums?.map((album) => {
    return (
      <div>
        <a href={album.link}> {album.title}</a>, {album.artist}
      </div>
    )
  })

  return (
    <>
      <section className="albums-page">
        ALBUMS
        <button onClick={handleRequest}>get</button>
        {albums ? albumsEls : ""}
      </section>
    </>
  )

}
