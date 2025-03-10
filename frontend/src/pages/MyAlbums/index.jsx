import { getUserAlbums, deleteAlbumById, getUserSavedAlbumsById } from "../../utilities/album-service";
import { getUserById } from "../../utilities/user-service";
import { useEffect, useState } from "react";
import AlbumCard from "../../components/AlbumCard";
import { Link, useLocation } from "react-router-dom";
import YouSure from "../../components/YouSure";
import("./myalbums.css");

export default function MyAlbums({ user }) {
    const [albums, setAlbums] = useState(null);
    const [savedAlbums, setSavedAlbums] = useState(null);
    const [profile, setProfile] = useState(null);
    const [youSureId, setYouSureId] = useState(null);

    const location = useLocation();

    useEffect(() => {
        getProfile();
    }, [location]);

    useEffect(() => {
        if (profile) {
            handleLoad();
        }
    }, [profile]);

    async function handleLoad() {
        const albumsResp = await getUserAlbums(profile);
        setAlbums(albumsResp);
        const savedAlbumsResp = await getUserSavedAlbumsById(profile);
        setSavedAlbums(savedAlbumsResp);
    }

    async function getProfile() {
        const id = location.pathname.split("/")[location.pathname.split("/").length - 1]
        const profileResp = await getUserById(id);
        if (profileResp._id === id) {
            setProfile(profileResp);
        }
    }

    async function handleRemove(e) {
        await deleteAlbumById(e.target.name);
        handleLoad();
    }

    function getConfirmation(e) {
        setYouSureId(e.target.name)
    }

    return (
        albums ? (
            <section className="my-albums-page">
                <h2 className="my-albums-title">{profile?.name}'s uploads</h2>
                <div className="albums">
                    {albums.length > 0 ? (
                        albums.map((album) => (
                            <>
                                <div key={album._id} className="my-card">
                                    <AlbumCard album={album} user={user} />
                                    <div className="my-card-buttons">
                                        <Link to={`/albums/edit/${album._id}`}>
                                            {user?.email === profile?.email && <button className="edit-btn">EDIT</button>}
                                        </Link>
                                        {user?.email === profile?.email && (
                                            <button onClick={getConfirmation} name={album._id} className="remove-btn">
                                                REMOVE
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {youSureId == album._id && <>
                                    <div className="comment-blackout" >
                                    </div >
                                    <YouSure user={user} album={album} handleRemove={handleRemove} setYouSureId={setYouSureId} youSureId={youSureId} />
                                </>}
                            </>
                        ))
                    ) : (
                        <p className="my-albums-title">No music found.</p>
                    )}
                </div>
                <h2 className="my-albums-title">{profile?.name}'s liked music</h2>
                <div className="albums">
                    {savedAlbums?.length > 0 ? (
                        savedAlbums.map((album) => (
                            <div key={album._id} className="my-card">
                                <AlbumCard album={album} user={user} />
                            </div>
                        ))
                    ) : (
                        <p className="my-albums-title">No music found.</p>
                    )}
                </div>
            </section>
        ) :
            <h4 className="loading">HACKIN' A DART BE RIGHT BACK</h4>

    );
}
