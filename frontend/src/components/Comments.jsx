import { useEffect, useState } from "react";
import { getCommentsByAlbumId, addComment } from "../utilities/comment-service.js"
import Comment from "./Comment.jsx"
import { useNavigate } from "react-router-dom";
import("../styles/comments.css")

export default function Comments({ album, setCommentOpen, user }) {
    const [comments, setComments] = useState(null)
    const navigate = useNavigate()
    async function handleRequest() {
        const commentsResp = await getCommentsByAlbumId(album._id)
        if (commentsResp.length) {
            commentsResp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setComments(commentsResp)
        }
    }

    async function handleSubmit(e) {
        const commentText = e.target.previousSibling.value
        const data = {
            "content": commentText,
            "user_id": user._id,
            "user_name": user.name,
            "album_id": album._id
        }
        const addCommentResp = await addComment(data)
        if (addCommentResp._id) {
            handleRequest()
            e.target.previousSibling.value = ""
        }
    }

    useEffect(() => {
        handleRequest()
    }, [])

    const commentEls = comments?.map((comment) => {
        return (
            <Comment comment={comment} user={user} handleRequest={handleRequest} />
        )
    })

    return (
        <>
            <div className="comments">
                {comments ? commentEls : user ? "Be the first to leave a comment!" : "Sign in to leave a comment!"}
                <button className="comments-x" onClick={() => { setCommentOpen(false) }}>X</button>
                {user && <><textarea className="comment-field"></textarea>
                    <button onClick={handleSubmit} className="comment-submit">Submit</button></>}
            </div >

        </>
    )
}
