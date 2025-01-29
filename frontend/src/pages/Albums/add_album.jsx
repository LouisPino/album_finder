import { useEffect, useState } from "react";
import { addAlbum } from "../../utilities/album-service";


export default function AddAlbum({ user }) {
    const [uploaded, setUploaded] = useState(false)
    const blankAlbum = {
        title: "",
        artist: "",
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
        if (e.target.name != "categories") {
            tempObj[e.target.name] = e.target.value
        } else {
            tempObj.categories = getCategoriesChecked()
        }
        setAlbumInfo(tempObj)
    }

    function handleReset() {
        setUploaded(false)
    }

    const [albumInfo, setAlbumInfo] = useState(blankAlbum)
    async function handleClick() {
        addAlbum(albumInfo)
        setUploaded(true)
    }
    const fieldELs = Object.keys(blankAlbum).map((key) => {
        return key != "categories" ?
            <>
                <label>{key === "uploader" ? "your name" : key}</label>
                <input className="filter" name={key} onChange={handleInput}></input>
            </>
            :
            <>
                <label>{key}</label>
                <fieldset>
                    <div className="filter" >
                        {categoryOptions}
                    </div>
                </fieldset>
            </>
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