import { useEffect, useState } from "react";
import Heart from "./Heart.jsx";
import Comments from "./Comments.jsx";

export default function AlbumCard({ album, user }) {
    const [commentOpen, setCommentOpen] = useState(false)
    const artistStr = album.artist.join(", ")

    return (<>
        <div className="album-card">
            {user && <Heart user={user} album={album} />}
            <img onClick={() => setCommentOpen(true)} className="album-card-img comment-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbgCn6JJjq6hZey8uBc7rIJi3PVlrp5VPeg&s" />
            <p className="album-card-img comment-icon-number">{album.comments?.length}</p>
            <a href={album.link} target="_blank">
                <img className="album-image" src={album.image} />
                <h3> {album.title}</h3>
                <h4>{artistStr}</h4>
            </a >
        </div >
        {commentOpen &&
            <><Comments album={album} user={user} commentsProp={album.comments} setCommentOpen={setCommentOpen}></Comments>
                <div className="comment-blackout" >
                </div >
            </>
        }
    </>
    )
}
