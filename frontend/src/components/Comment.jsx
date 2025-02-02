import { useEffect, useState } from "react";
import Comment from "./Comment.jsx";

export default function Comment({ comment }) {
    return (
        <div className="comment">
            <div className="comment-user">{comment.content}</div>
            <div className="comment-content">{comment.user_name}</div>=
        </div >
    )
}
