import { getAlbums } from "../../utilities/album-service";
import { useEffect, useState } from "react";


export default function Albums() {
  const [albums, setAlbums] = useState(null);


  useEffect(() => {
    handleRequest()
  }, [])


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
        <img src={album.image} />
      </div>
    )
  })

  return (albums ?
    <section className="albums-page">
      {albumsEls}
    </section>
    : <>
      "LOADING"
      < button onClick={handleRequest} > get</button >
    </>
  )
}
