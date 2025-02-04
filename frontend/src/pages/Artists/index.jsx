import { getArtists } from "../../utilities/artist-service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import("./style.css");

export default function Artists() {
    const [artists, setArtists] = useState(null);

    useEffect(() => {
        handleRequest();
    }, []);

    async function handleRequest() {
        const artistResp = await getArtists();
        if (artistResp.length) {
            let sortedArtists = [...artistResp].sort((a, b) =>
                a[0].toUpperCase().localeCompare(b[0].toUpperCase())
            );
            setArtists(sortedArtists);
        }
    }

    if (!artists) {
        return <h4 className="loading">HACKIN' A DART BE RIGHT BACK</h4>
            ;
    }

    let tempLetter = "z";
    let artistEls = [];


    for (let artist of artists) {
        if (artist[0].toUpperCase() !== tempLetter) {
            artistEls.push(<h2 className="artist-letter" key={artist[0].toUpperCase()}>{artist[0].toUpperCase()}</h2>);
            tempLetter = artist[0].toUpperCase();
        }
        artistEls.push(
            <Link key={artist} className="artist-name-link" to={`${artist}`}>
                <p className="artist-name">{artist}</p>
            </Link>
        );
    }

    return (
        <section className="artists-page">
            {artistEls}
        </section>
    );
}
