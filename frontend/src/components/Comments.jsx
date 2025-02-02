import { useEffect, useState } from "react";
import { getCommentsByAlbumId } from "../utilities/comment-service.js"
import Comment from "./Comment.jsx"
import("../styles/comments.css")

export default function Comments({ album, setCommentOpen }) {
    const [comments, setComments] = useState(null)

    async function handleRequest() {
        const commentsResp = await getCommentsByAlbumId(album._id)
        if (commentsResp.length) {
            commentsResp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setComments(commentsResp)
        }
    }

    useEffect(() => {
        handleRequest()
    }, [])

    const commentEls = comments?.map((comment) => {
        return (
            <Comment comment={comment} />
        )
    })

    return (
        <div className="comments">
            {comments ? commentEls : "Be the first to leave a comment!"}
            <button className="comment-x" onClick={() => { setCommentOpen(false) }}>X</button>
            <textarea className="comment-field"></textarea>
            <button className="comment-submit">Submit</button>
        </div >
    )
}
