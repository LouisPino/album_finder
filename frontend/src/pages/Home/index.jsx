import { useEffect, useState } from "react";
import { addAlbum } from "../../utilities/album-service";


export default function Home() {

    return (
        <div className="welcome-page">
            <h4>Welcome to the album finder!</h4>
            <p>This website is to help connect listeners to the recorded works of <strong>Toronto's experimental music scene</strong>.</p>
            <p><strong>Sign in</strong> to keep track of your favorite albums and to <strong>add your own.</strong></p>
            <h3>For up to date <strong>live event listings</strong> and <strong>archival recordings</strong>, check out the incredible ongoing work of Joe Strutt at <a href="https://mechanicalforestsound.blogspot.com/" target="_blank">mechanical forest sound</a></h3>
        </div>
    )
}
