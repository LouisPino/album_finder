import { getAlbums } from "../../utilities/album-service";
import { useEffect, useState } from "react";
import AlbumCard from "../../components/AlbumCard";
import("./random.css")

export default function Random({ }) {
    const [album, setAlbum] = useState(null)

    async function getNewAlbum() {
        const albums = await getAlbums()
        setAlbum(albums[Math.floor(Math.random() * albums.length)])
    }

    useEffect(() => {
        getNewAlbum()
    }, [])


    return (album ?
        <div className="random-main">
            Random Album
            <AlbumCard album={album} />
            <button className="random-btn" onClick={getNewAlbum}>Pick Another!</button>
        </div>
        :
        "LOADING"
    )
}
