import { getArtists } from "../../utilities/artist-service";
import { useEffect, useState } from "react";


export default function Artists() {
    const [artists, setArtists] = useState(null)
    useEffect(() => {
        handleRequest()
    }, [])


    async function handleRequest() {
        const artistResp = await getArtists()
        console.log(artistResp.sort())

        if (artistResp.length) {
            setArtists(artistResp);
        }
    }

    const artistEls = artists?.map((artist) => (
        <p>{artist}</p>
    ))
    return (
        artists ?
            <section className="artists-page">
                {artistEls}
            </section>
            : "LOADING"
    )
}
