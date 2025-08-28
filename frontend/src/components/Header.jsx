import { Link } from "react-router-dom";
import GoogleAuth from './GoogleAuth';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';


import("../styles/header.css")

export default function Header({ user, setUser }) {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    function isInAppBrowser() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        return /Instagram|FBAN|FBAV/i.test(ua);
    }
    function alertUser() {
        if (isInAppBrowser()) {
            alert("Instagram's web browser doesn't allow sign in. Please open in a web browser. Sorry!");
            return "error"
        } else {
            return "success"
        }
    }

    return (
        <div className="header ">
            <div className="header-l">
                <Link className="header-link" to="/"><p className="link-text">Home</p></Link>
                <Link className="header-link" id="albums-header" to="/albums"><p className="link-text">Music</p></Link>
                <Link className="header-link" to="/artists"><p className="link-text">Artists</p></Link>
                <Link className="header-link" id="random-header" to="/random"><p className="link-text">Random</p></Link>
            </div>
            {user ?
                <div className="header-r">
                    <Link className="header-link" to="/albums/add"><p className="link-text">Add Music</p></Link>
                    <Link className="header-link" to={`/users/${user._id}`}><p className="link-text">My Music</p></Link>
                    <Link className="header-link" onClick={() => { setUser(null) }}><p className="link-text">Log Out</p></Link>
                </div>
                :
                <div className="header-r">
                    <GoogleOAuthProvider clientId={clientId} >
                        <GoogleAuth alertUser={alertUser} user={user} setUser={setUser} clientId={clientId} useGoogleLogin={useGoogleLogin} />
                    </ GoogleOAuthProvider>
                </div>
            }
        </div >
    )

}
