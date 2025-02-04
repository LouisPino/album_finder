
import("../styles/yousure.css")
export default function YouSure({ album, handleRemove, setYouSureId }) {
    return (
        <div className="you-sure">
            <h2 className="you-sure-text">You sure you wanna delete {album.title}??</h2>
            <div className="you-sure-btns">
                <button className="you-sure-btn" onClick={() => setYouSureId(null)}>nope!</button>
                <button name={album._id} onClick={handleRemove}>damn yeah i do</button>
            </div>
        </div >
    )
}
