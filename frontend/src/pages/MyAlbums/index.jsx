import { getUserAlbums, deleteAlbumById } from "../../utilities/album-service";
import { useEffect, useState } from "react";
import AlbumCard from "../../components/AlbumCard";
import { Link } from "react-router-dom";
import("./myalbums.css")


export default function MyAlbums({ user }) {
    const [albums, setAlbums] = useState(null);

    useEffect(() => {
        handleLoad()
    }, [])
    async function handleLoad() {
        const albumsResp = await getUserAlbums(user)
        if (albumsResp.length) {
            setAlbums(albumsResp);
        }
    }

    function handleEdit(e) {

    }

    function handleRemove(e) {
        deleteAlbumById(e.target.name)
        handleLoad()
    }

    const albumsEls = albums?.map((album) => {
        return (<div className="my-card">
            <AlbumCard album={album} />
            <Link to={`/albums/edit/${album._id}`}>
                <button onClick={handleEdit} name={album._id} className="edit-btn">EDIT</button>
            </Link >
            <button name={album._id} className="remove-btn">REMOVE</button>
        </div >
        )
    })




    return (albums ?
        <section className="my-albums-page">
            <h2>{user.name}'s albums</h2>
            <div className="albums">
                {albumsEls}
            </div>
        </section>
        : <>
            "No Albums"
        </>
    )
}
