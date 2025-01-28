import { getArtists, findByArtist } from "../../utilities/artist-service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export default function Artists() {
    const [artists, setArtists] = useState(null)
    useEffect(() => {
        handleRequest()
    }, [])

    async function getfindByArtist(e) {
        console.log(await findByArtist(e.target.name))
    }
    async function handleRequest() {
        const artistResp = await getArtists()

        if (artistResp.length) {
            setArtists(artistResp);
        }
    }

    const artistEls = artists?.map((artist) => (
        <Link to={`${artist}`} >
            <p>{artist}</p>
        </Link>

    ))
    return (
        artists ?
            <section className="artists-page">
                {artistEls}
            </section>

            : "LOADING"
    )
}
