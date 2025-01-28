import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import GoogleAuth from './GoogleAuth';

import("../styles/header.css")

export default function Header() {
    const [user, setUser] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
    }, [])
    return (
        <div className="header ">
            <div className="header-l">
                <Link className="header-link" to="/">Home</Link>
                <Link className="header-link" to="/albums">Albums</Link>
                <Link className="header-link" to="/artists">Artists</Link>
                <Link className="header-link" to="/random">Pick a Random Album</Link>
            </div>
            {user ?
                <div className="header-r">
                    <Link className="header-link" to="/albums/add">Add Album</Link>
                    <Link className="header-link" to="/users">My Albums</Link>
                    <Link className="header-link" to="/users">Log Out</Link>
                </div>
                :
                <div className="header-r">
                    <Link className="header-link" to="/users">Log In</Link>
                    <GoogleAuth />
                </div>


            }
        </div >
    )

}
