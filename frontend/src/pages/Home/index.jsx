import { useEffect, useState } from "react";
import { addAlbum } from "../../utilities/album-service";
import("./style.css")


export default function Home() {

    return (
        <div className="welcome-page">
            <p className="home-top-text">Experimental musicians in Toronto are releasing amazing music. Click around and find something you like.</p>
            <p className="home-top-text"><strong>Sign in</strong> to keep track of your favorite albums and to <strong>upload your music.</strong></p>
            <div className="home-info">
                <div className="home-info-l">
                    <div className="home-info-l-top" >
                        <h2>For up to date <strong>live event listings</strong> and <strong>decades of archival audio and video recordings</strong>, check out <a href="https://mechanicalforestsound.blogspot.com/" id="mech-forest" target="_blank">MECHANICAL FOREST SOUND
                        </a></h2>

                    </div>
                    {/* <div className="home-info-l-bottom" >
                        <p className="title">VENUES</p>

                    </div> */}
                </div>
                {/* <div className="home-info-r">
                    <h4>Venues to check out</h4>
                    <p>Tranzac</p>
                    <p>ArrayMusic</p>
                    <p>Wenona Lodge</p>
                    <p>Burdock Music Hall</p>
                </div> */}
            </div>
        </div>
    )
}
