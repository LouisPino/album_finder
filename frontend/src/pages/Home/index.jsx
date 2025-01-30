import { useEffect, useState } from "react";
import { addAlbum } from "../../utilities/album-service";
import("./style.css")


export default function Home() {

    return (
        <div className="welcome-page">
            <h1 className="title">Welcome to 6per</h1>
            <h2>This website is to help connect listeners to the recorded works of <strong>Toronto's experimental music scene</strong>.</h2>
            <h2><strong>Sign in</strong> to keep track of your favorite albums and to <strong>upload your own.</strong></h2>
            <h2 className="title">For up to date <strong>live event listings</strong> and <strong>archival recordings</strong>, check out <a href="https://mechanicalforestsound.blogspot.com/" target="_blank">mechanical forest sound</a></h2>
        </div>
    )
}
