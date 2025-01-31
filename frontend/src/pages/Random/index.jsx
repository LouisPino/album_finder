import { getAlbums } from "../../utilities/album-service";
import { useEffect, useState } from "react";
import AlbumCard from "../../components/AlbumCard";
import("./random.css")

export default function Random({ user }) {
    const [album, setAlbum] = useState(null)
    const [albums, setAlbums] = useState(null)


    async function getNewAlbum() {
        console.log("getnewalbums")
        if (!albums) {
            const albumsResp = await getAlbums()
            setAlbums(albumsResp)
            console.log(albumsResp)
        }
        setAlbum(albums[Math.floor(Math.random() * albums.length)])
    }

    useEffect(() => {
        console.log("useeffect")
        if (!album) {
            getNewAlbum()
        }
    }, [albums])


    return (album ?
        <div className="random-main">
            <AlbumCard album={album} user={user} />
            <p className="random-desc">{album.description}</p>
            <button className="random-btn" onClick={getNewAlbum}>Pick Again</button>
        </div>
        :
        <h4 className="loading">HACKIN' A DART BE RIGHT BACK</h4>
    )
}
