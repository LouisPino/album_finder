import { useLocation } from "react-router-dom";
import { findByArtist } from "../../utilities/artist-service";
import AlbumCard from "../../components/AlbumCard";
import { useEffect, useState } from "react";


export default function Artist({ user }) {
    const [albums, setAlbums] = useState(null)
    const location = useLocation()
    useEffect(() => {
        loadAlbums(location.pathname)
    }, [])

    async function loadAlbums() {
        const albumResp = await findByArtist(location.pathname.substring(9))
        if (albumResp.length) {
            setAlbums(albumResp);
        }
    }

    const albumEls = albums?.map((album) => (
        <AlbumCard album={album} user={user} />
    ))
    return (
        albums ?
            <section className="artist-page">
                <h1 className="artist-title">{location.pathname.substring(9).split("%20").join(" ")}</h1>
                <div className="albums">
                    {albumEls}
                </div>
            </section>

            :
            <>
                <h4 className="loading">HACKIN' A DART BE RIGHT BACK</h4></>

    )
}
