export default function Comment({ comment }) {
    const date = new Date(comment.createdAt);
    return (
        <div className="comment">
            <div className="comment-l">
                <p className="comment-user">{comment.user_name}</p>
                <p className="comment-timestamp">{date.toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="comment-content">{comment.content}
                <button className="comment-x">X</button>
            </div>
        </div >
    )
}
