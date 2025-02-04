import("../styles/yousure.css")
export default function YouSureComment({ handleRemove, setConfirmDeleteOpen }) {
    return (
        <div className="you-sure">
            <h2 className="you-sure-text">You sure you wanna delete this comment??</h2>
            <div className="you-sure-btns">
                <button className="you-sure-btn" onClick={() => setConfirmDeleteOpen(false)}>nope!</button>
                <button onClick={handleRemove}>damn yeah i do</button>
            </div >
        </div >
    )
}
