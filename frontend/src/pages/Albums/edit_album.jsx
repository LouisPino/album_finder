import { useEffect, useState } from "react";
import { editAlbum, getAlbumById } from "../../utilities/album-service";
import { useLocation, useNavigate } from "react-router-dom";


export default function EditAlbum({ user }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [albumInfo, setAlbumInfo] = useState(null)
    const [id, setId] = useState()
    const blankAlbum = {
        title: "",
        description: "",
        link: "",
        image: "",
        release_year: 0,
        artist: [],
        categories: []
    }
    useEffect(() => {
        getAlbumInfo()
    }, [])

    const [artistsLoaded, setArtistsLoaded] = useState(false);

    useEffect(() => {
        if (albumInfo && !artistsLoaded) {
            loadArtists();
            setArtistsLoaded(true); // Prevent re-running
        }
    }, [albumInfo]);


    async function getAlbumInfo() {
        const album = await getAlbumById(location.pathname.split("/")[location.pathname.split("/").length - 1])
        setAlbumInfo(album)
        setId(album._id)
    }
    const categories = ["noise", "ambient", "improvisation", "acoustic", "electronic", "vocal"]
    const categoryOptions = categories.map((category) => (
        <>
            <input onChange={handleInput} className="category-select" type="checkbox" id={category} name="categories" value={category} checked={albumInfo?.categories.includes(category) ? "on" : ""} />
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
        console.log(e.target.value)
        let tempAlbum = { ...albumInfo }
        if (e.target.name != "categories" && e.target.name != "artist") {
            tempAlbum[e.target.name] = e.target.value
        } else if (e.target.name === "artist") {
            const artistEls = document.querySelectorAll(".artist-input")
            let values = []
            for (const el of artistEls) {
                if (el.value) {
                    values.push(el.value)
                }
            }
            tempAlbum[e.target.name] = values
        } else if (e.target.name === "categories") {
            tempAlbum.categories = getCategoriesChecked()
        }
        setAlbumInfo(tempAlbum)
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

    function loadArtists() {
        if (albumInfo) {
            for (const artist of albumInfo.artist) {
                const addArtistEl = document.querySelector(".add-artist-btn")
                const newEl = document.createElement("input")
                newEl.classList.add("artist-input")
                newEl.name = "artist"
                newEl.value = artist
                newEl.addEventListener("input", handleInput)
                addArtistEl.parentElement.insertBefore(newEl, addArtistEl)
            }
        }
    }

    async function handleClick() {
        let album = albumInfo
        album._id = id
        for (let key of Object.keys(albumInfo)) {
            if (!albumInfo[key] && key != "uploader" && key != "email" && key != "__v") {
                alert(`${key} Must fill all fields`)
                return
            } else if (albumInfo.categories.length === 0) {
                alert(` Must choose at least one category`)
                return
            } else if (isNaN(albumInfo.release_year)) {
                alert(` Release year must be an integer`)
                return
            }
        }
        editAlbum(album)
        navigate(`/users/${user.email}`)
    }
    if (albumInfo) {
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
                        <button className="add-artist-btn" onClick={handleAddArtist}> + </button>
                    </div>
                </>
                )
            } else {
                return (
                    <>
                        <label>{key}</label>
                        <input className="filter" name={key} onChange={handleInput} value={albumInfo[key]}></input>
                    </>
                )
            }
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