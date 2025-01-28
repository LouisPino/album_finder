import { useEffect, useState } from "react";
import { addAlbum } from "../../utilities/album-service";


export default function AddAlbum() {
    const blankAlbum = {
        title: "",
        artist: "",
        link: "",
        image: "",
        uploader: "",
        categories: []
    }
    const categories = ["noise", "ambient", "improvisation", "acoustic"]
    const categoryOptions = categories.map((category) => (
        <>
            <input onChange={handleInput} className="category-select" type="checkbox" id={category} name="categories" value={category} />
            <label for={category}>{category}</label>
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
        if (e.target.name != "categories") {
            tempObj[e.target.name] = e.target.value
        } else {
            tempObj.categories = getCategoriesChecked()
        }
        setAlbumInfo(tempObj)
    }

    const [albumInfo, setAlbumInfo] = useState(blankAlbum)
    async function handleClick() {
        addAlbum(albumInfo)
    }
    const fieldELs = Object.keys(blankAlbum).map((key) => {
        return key != "categories" ?
            <>
                <label>{key}</label>
                <input name={key} onChange={handleInput}></input>
            </>
            :
            <>
                <label>{key}</label>
                <fieldset>
                    <div>
                        {categoryOptions}
                    </div>

                </fieldset>
            </>
    }
    )
    return (
        <section className="add-album">
            <form>
                {fieldELs}
            </form>
            <button onClick={handleClick}>upload</button>
        </section>
    )
}
