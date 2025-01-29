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
            <label className="checkbox-label" htmlFor={category}>{category}</label>
        </>
    ))

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
            console.log(tempObj.categories)
        }
        setAlbumInfo(tempObj)
    }

    function handleReset() {
        setUploaded(false)
    }

    function handleAddArtist(e) {
        e.preventDefault()
        const addArtistEl = document.querySelector(".add-artist-btn")
        const newEl = document.createElement("input")
        newEl.classList.add("artist-input")
        newEl.name = "artist"
        newEl.addEventListener("input", handleInput)
        addArtistEl.parentElement.insertBefore(newEl, addArtistEl)
    }

    const [albumInfo, setAlbumInfo] = useState(blankAlbum)
    async function handleClick() {
        addAlbum(albumInfo)
        setUploaded(true)
    }
    const fieldELs = Object.keys(blankAlbum).map((key) => {
        if (key === "categories") {
            return (
                <>
                    <label>{key}</label>
                    <fieldset>
                        <div className="filter" >
                            {categoryOptions}
                        </div>
                    </fieldset>
                </>
            )
        } else if (key === "artist") {
            return (<>
                <label>artists</label>
                <div className="artists-field filter" >
                    <input onChange={handleInput} name="artist" className="artist-input"></input>
                    <button className="add-artist-btn" onClick={handleAddArtist}> + </button>
                </div>
            </>
            )
        } else {
            return (
                <>
                    <label>{key}</label>
                    <input className="filter" name={key} onChange={handleInput}></input>
                </>
            )
        }


    }
    )
    return (
        uploaded ?
            <>
                <p>Thank you for adding!</p>
                <button onClick={handleReset}>Upload Another?</button>
            </>
            :
            <section className="add-album">
                <form className="add-filters">
                    {fieldELs}
                </form>
                <button onClick={handleClick}>upload</button>
            </section>
    )
}