import { useEffect, useState } from "react";

export default function AlbumCard({ album }) {
    const artistStr = album.artist.join(", ")
    return (
        <div className="album-card">
            <a href={album.link} target="_blank">
                <img className="album-image" src={album.image} />
                <h3> {album.title}</h3>
                <h4>{artistStr}</h4>
            </a >
        </div >
    )

}
