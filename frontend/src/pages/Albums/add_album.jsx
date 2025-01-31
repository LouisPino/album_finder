import { useEffect, useState } from "react";
import { addAlbum } from "../../utilities/album-service";


export default function AddAlbum({ user }) {
    const [uploaded, setUploaded] = useState(false)
    const blankAlbum = {
        title: "",
        artist: [],
        link: "",
        image: "",
        release_year: 0,
        description: "",
        categories: [],
    }
    const categories = ["noise", "ambient", "improvisation", "acoustic", "electronic", "vocal"]
    const categoryOptions = categories.map((category) => (
        <>
            <input onChange={handleInput} className="category-select" type="checkbox" id={category} name="categories" value={category} />
            <label className="checkbox-label" htmlFor={category}>{toTitleCase(category)}</label>
        </>
    ))
    function toTitleCase(str) {
        return str
            .toLowerCase() // Convert the whole string to lowercase first
            .split(' ') // Split the string into an array of words
            .map(word => {
                // Capitalize the first letter and keep the rest lowercase
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' '); // Join the words back into a single string
    }
    function getCategoriesChecked() {
        const categoryEls = document.querySelectorAll(".category-select")
        let checkedCategories = []
        for (let category of categoryEls) {
            if (category.checked) {
                checkedCategories.push(category.value)
            }
        }
        return checkedCategories
    }

    function handleInput(e) {
        let tempObj = albumInfo
        tempObj.uploader = user.name
        tempObj.email = user.email
        if (e.target.name != "categories" && e.target.name != "artist") {
            tempObj[e.target.name] = e.target.value
        } else if (e.target.name === "artist") {
            const artistEls = document.querySelectorAll(".artist-input")
            let values = []
            for (const el of artistEls) {
                if (el.value) {
                    values.push(el.value)
                }
            }
            tempObj[e.target.name] = values
        } else if (e.target.name === "categories") {
            tempObj.categories = getCategoriesChecked()
        }
        setAlbumInfo(tempObj)
    }

    function handleReset() {
        setUploaded(false)
    }

    function handleAddArtist(e) {
        const addArtistEl = document.querySelector(".add-artist-btn")
        const newEl = document.createElement("input")
        newEl.classList.add("artist-input")
        newEl.name = "artist"
        newEl.addEventListener("input", handleInput)
        addArtistEl.parentElement.insertBefore(newEl, addArtistEl)
    }

    const [albumInfo, setAlbumInfo] = useState(blankAlbum)

    async function handleClick() {
        for (let key of Object.keys(albumInfo)) {
            if (!albumInfo[key] && key != "uploader" && key != "email") {
                alert(`Must fill all fields: ${key}`)
                return
            } else if (albumInfo.categories.length === 0) {
                alert(`Must choose at least one category`)
                return
            } else if (isNaN(albumInfo.release_year)) {
                alert(`Release year must be an integer`)
                return
            }
        }
        addAlbum(albumInfo)
        setAlbumInfo(blankAlbum)
        setUploaded(true)
    }

    const fieldELs = Object.keys(blankAlbum).map((key) => {
        if (key === "categories") {
            return (
                <>
                    <label>{toTitleCase(key)}</label>
                    <fieldset>
                        <div className="add-album-filter" >
                            {categoryOptions}
                        </div>
                    </fieldset>
                </>
            )
        } else if (key === "artist") {
            return (<>
                <label>Artists</label>
                <div className="artists-field filter" >
                    <input onChange={handleInput} name="artist" className="artist-input"></input>
                    <button className="add-artist-btn" onClick={handleAddArtist}> + </button>
                </div>
            </>
            )
        } else {
            return (
                <>
                    {key != "image" && key != "link" && <label>{toTitleCase(key.split("_").join(" "))}</label>}
                    {key === "image" && <label>Image Link (right click and copy image address)</label>}
                    {key === "link" && <label>Link to music</label>}
                    <input className="filter" name={key} type={key === "description" ? "textarea" : "text"} onChange={handleInput}></input>
                </>
            )
        }


    }
    )
    return (
        uploaded ?
            <div className='after-add'>
                <p className="thanks">Thank you for adding!</p>
                <button className="another" onClick={handleReset}>Upload Another?</button>
            </div>
            :
            <section className="add-album">
                <form className="add-filters">
                    {fieldELs}
                </form>
                <button onClick={handleClick}>upload</button>
            </section>
    )
}