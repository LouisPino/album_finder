import { getAlbums } from "../../utilities/album-service";
import { useEffect, useRef, useState } from "react";
import AlbumCard from "../../components/AlbumCard";
import("./random.css")

export default function Random({ user }) {
    const [album, setAlbum] = useState(null)
    const albumsRef = useRef(null);

    async function getNewAlbum() {
        if (!albumsRef.current) {
            const albumsResp = await getAlbums();
            albumsRef.current = albumsResp;
        }
        setAlbum(albumsRef.current[Math.floor(Math.random() * albumsRef.current.length)]);
    }

    useEffect(() => {
        if (!album) {
            getNewAlbum()
        }
    }, [])



    useEffect(() => {
        const randomHeaderEl = document.getElementById("random-header");

        if (randomHeaderEl) {
            const handleRandom = () => getNewAlbum();
            randomHeaderEl.addEventListener("click", handleRandom);
            return () => {
                randomHeaderEl.removeEventListener("click", handleRandom);
            };
        }
    }, []);



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
