import { useEffect, useState } from "react";
import { addAlbum } from "../../utilities/album-service";


export default function AddAlbum() {
    const blankAlbum = {
        title: "",
        artist: "",
        link: "",
        image: "",
        uploader: ""
    }
    function handleInput(e) {
        let tempObj = albumInfo
        tempObj[e.target.name] = e.target.value
        setAlbumInfo(tempObj)
    }

    const [albumInfo, setAlbumInfo] = useState(blankAlbum)
    async function handleClick() {
        addAlbum(albumInfo)
    }
    const fieldELs = Object.keys(blankAlbum).map((key) => (
        <>
            <label>{key}</label>
            <input name={key} onChange={handleInput}></input>
        </>
    )
    )
    console.log(Object.keys(blankAlbum))
    return (
        <section className="add-album">
            <form>
                {fieldELs}
            </form>
            <button onClick={handleClick}>upload</button>
        </section>
    )
}
