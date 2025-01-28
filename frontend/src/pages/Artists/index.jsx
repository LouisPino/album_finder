import { getArtists, findByArtist } from "../../utilities/artist-service";
import { useEffect, useState } from "react";


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
        console.log(artistResp.sort())

        if (artistResp.length) {
            setArtists(artistResp);
        }
    }

    const artistEls = artists?.map((artist) => (
        <>
            <p>{artist}</p>
            <button name={artist} onClick={getfindByArtist}>FIND MY ALBUMS</button>
        </>

    ))
    return (
        artists ?
            <section className="artists-page">
                {artistEls}
            </section>
            : "LOADING"
    )
}
