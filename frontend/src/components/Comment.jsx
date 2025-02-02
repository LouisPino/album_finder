import { useState } from "react";
import YouSureComment from "./YouSureComment";
import { deleteComment } from "../utilities/comment-service";

export default function Comment({ comment, user, handleRequest }) {
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
    const date = new Date(comment.createdAt);
    function confirmDelete() {
        setConfirmDeleteOpen(true)
    }

    async function handleRemove() {
        await deleteComment(comment._id)
        setConfirmDeleteOpen(false)
        handleRequest()
    }


    return (
        <div className="comment">
            <div className="comment-l">
                <p className="comment-user">{comment.user_name}</p>
                <p className="comment-timestamp">{date.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="comment-content">{comment.content}
                {user?._id === comment.user_id && <button onClick={confirmDelete} className="comment-x">X</button>}
            </div>
            {confirmDeleteOpen && <YouSureComment user={user} comment={comment} handleRemove={handleRemove} setConfirmDeleteOpen={setConfirmDeleteOpen}></YouSureComment>}
        </div >
    )
}
