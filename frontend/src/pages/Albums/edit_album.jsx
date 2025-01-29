import { useEffect, useState } from "react";
import { editAlbum, getAlbumById } from "../../utilities/album-service";
import { useLocation } from "react-router-dom";


export default function EditAlbum({ user, album }) {
    const location = useLocation()
    const [albumInfo, setAlbumInfo] = useState(null)
    const [id, setId] = useState()
    const blankAlbum = {
        title: "",
        description: "",
        link: "",
        image: "",
        release_year: 0,
        categories: []
    }
    useEffect(() => {
        getAlbumInfo()
    }, [])


    async function getAlbumInfo() {
        const album = await getAlbumById(location.pathname.split("/")[location.pathname.split("/").length - 1])
        setAlbumInfo(album)
        setId(album._id)
        console.log(album)
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
        let tempAlbum = { ...albumInfo }
        if (e.target.name != "categories") {
            tempAlbum[e.target.name] = e.target.value
        } else {
            tempAlbum.categories = getCategoriesChecked()
        }
        setAlbumInfo(tempAlbum)
    }

    async function handleClick() {
        let album = albumInfo
        album._id = id
        editAlbum(album)
    }
    if (albumInfo) {

        const fieldELs = Object.keys(blankAlbum).map((key) => {
            return key != "categories" ?
                <>
                    <label>{key}</label>
                    <input className="filter" name={key} onChange={handleInput} value={albumInfo[key]}></input>
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
            <section className="add-album">
                <form className="add-filters">
                    {fieldELs}
                </form>
                <button onClick={handleClick}>upload</button>
            </section>
        )
    }
}