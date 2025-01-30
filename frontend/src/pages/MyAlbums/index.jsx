import { getUserAlbums, deleteAlbumById, getUserSavedAlbumsById } from "../../utilities/album-service";
import { getUserByEmail } from "../../utilities/user-service";
import { useEffect, useState } from "react";
import AlbumCard from "../../components/AlbumCard";
import { Link, useLocation } from "react-router-dom";
import("./myalbums.css");

export default function MyAlbums({ user }) {
    const [albums, setAlbums] = useState(null);
    const [savedAlbums, setSavedAlbums] = useState(null);
    const [profile, setProfile] = useState(null);

    const location = useLocation();

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        if (profile) {
            handleLoad();
        }
    }, [profile]);

    useEffect(() => {
    }, [albums]);

    useEffect(() => {
    }, [savedAlbums]);

    async function handleLoad() {
        const albumsResp = await getUserAlbums(profile);
        setAlbums(albumsResp);
        const savedAlbumsResp = await getUserSavedAlbumsById(profile);
        setSavedAlbums(savedAlbumsResp);
    }

    async function getProfile() {
        const profileResp = await getUserByEmail(location.pathname.split("/").pop());
        if (profileResp.length) {
            setProfile(profileResp[0]);
        }
    }

    async function handleRemove(e) {
        await deleteAlbumById(e.target.name);
        handleLoad();
    }

    return (
        albums && (
            <section className="my-albums-page">
                <h2>{profile?.name}'s albums</h2>
                <div className="albums">
                    {albums.length > 0 ? (
                        albums.map((album) => (
                            <div key={album._id} className="my-card">
                                <AlbumCard album={album} user={user} />
                                <Link to={`/albums/edit/${album._id}`}>
                                    {user.email === profile?.email && <button className="edit-btn">EDIT</button>}
                                </Link>
                                {user.email === profile?.email && (
                                    <button onClick={handleRemove} name={album._id} className="remove-btn">
                                        REMOVE
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No albums found.</p>
                    )}
                </div>
                <h2>{profile?.name}'s liked albums</h2>
                <div className="albums">
                    {savedAlbums?.length > 0 ? (
                        savedAlbums.map((album) => (
                            <div key={album._id} className="my-card">
                                <AlbumCard album={album} user={user} />
                                <Link to={`/albums/edit/${album._id}`}>
                                    {user.email === profile?.email && <button className="edit-btn">EDIT</button>}
                                </Link>
                                {user.email === profile?.email && (
                                    <button onClick={handleRemove} name={album._id} className="remove-btn">
                                        REMOVE
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No albums found.</p>
                    )}
                </div>
            </section>
        )
    );
}
