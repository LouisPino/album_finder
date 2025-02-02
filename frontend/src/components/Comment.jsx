import { useState } from "react";
import YouSureComment from "./YouSureComment";
import { deleteComment } from "../utilities/comment-service";

export default function Comment({ comment, user, handleRequest }) {
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
    const date = new Date(comment.createdAt);
    function confirmDelete() {
        setConfirmDeleteOpen(true)
    }

    function handleRemove() {
        //delete comment
        setConfirmDeleteOpen(false)
        handleRequest()
        deleteComment(comment._id)
        console.log(comment._id)
    }


    return (
        <div className="comment">
            <div className="comment-l">
                <p className="comment-user">{comment.user_name}</p>
                <p className="comment-timestamp">{date.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="comment-content">{comment.content}
                <button onClick={confirmDelete} className="comment-x">X</button>
            </div>
            {confirmDeleteOpen && <YouSureComment user={user} comment={comment} handleRemove={handleRemove} setConfirmDeleteOpen={setConfirmDeleteOpen}></YouSureComment>}
        </div >
    )
}
