import { useEffect, useState } from "react";

export default function Comments({ user, album }) {
    const [comments, setComments] = useState(null)

    async function handleRequest() {
        const commentsResp = await getComments.ByAlbumId(album._id)
        if (commentsResp.length) {
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
            {commentEls}
        </div >
    )
}
