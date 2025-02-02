import { useEffect, useState } from "react";
import { updateUser } from "../utilities/user-api";

export default function Heart({ user, album }) {
    const whiteHeart = "https://media.istockphoto.com/id/1125688086/vector/minimal-flat-heart-shape-icon-with-thin-black-line-on-white-background.jpg?s=612x612&w=0&k=20&c=okT3HKnbexypwWbmSvfgGRDaww9KqGp7WfuCfKYzVUM="
    const redHeart = "https://media.istockphoto.com/id/1903985199/vector/heart-flat-icon.jpg?s=612x612&w=0&k=20&c=FOAQ1kofne38dLzm6C6vBE39nY9fynVBpQb7UcDW7gk="

    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if (user.favorites.includes(album._id)) {
            setLiked(true);
        } else {
            setLiked(false)
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
            <img className="album-card-img" src={liked ? redHeart : whiteHeart} />
        </div >
    )
}
