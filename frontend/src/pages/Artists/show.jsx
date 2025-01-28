import { useLocation } from "react-router-dom";
import { findByArtist } from "../../utilities/artist-service";
import { useEffect, useState } from "react";

export default function Artist() {
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
        <p><a href={album.link} target="_blank">{album.title}</a></p>

    ))
    return (
        albums ?
            <section className="artist-page">
                {albumEls}
            </section>

            : "LOADING"
    )
}
