import { useEffect, useState } from "react";
import { updateUser } from "../utilities/user-api";

export default function Heart({ user, album }) {
    const whiteHeart = "https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-empty-heart-shape-favorite-like-png-image_5292201.png"
    const redHeart = "https://media.istockphoto.com/id/1903985199/vector/heart-flat-icon.jpg?s=612x612&w=0&k=20&c=FOAQ1kofne38dLzm6C6vBE39nY9fynVBpQb7UcDW7gk="

    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if (user.favorites.includes(album._id)) {
            setLiked(true);
        }
    }, [user.favorites, album._id]);

    async function handleLike(e) {
        if (liked) {
            setLiked(false)
            user.favorites.splice(user.favorites.indexOf(album._id), 1);
        } else {
            setLiked(true)
            user.favorites.push(album._id)
        }
        updateUser(user)
    }

    return (
        <div onClick={handleLike} className="album-heart">
            <img src={liked ? redHeart : whiteHeart} />
        </div >
    )
}
