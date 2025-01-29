import { useEffect, useState } from "react";
import Heart from "./Heart.jsx";

export default function AlbumCard({ album, user }) {
    const artistStr = album.artist.join(", ")
    return (
        <div className="album-card">
            {user && <Heart user={user} album={album} />}
            <a href={album.link} target="_blank">
                <img className="album-image" src={album.image} />
                <h3> {album.title}</h3>
                <h4>{artistStr}</h4>
            </a >
        </div >
    )
}
