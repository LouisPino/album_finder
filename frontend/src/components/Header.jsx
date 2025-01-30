import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import GoogleAuth from './GoogleAuth';

import("../styles/header.css")

export default function Header({ user, setUser }) {


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
                    <Link className="header-link" to={`/users/${user._id}`}>My Albums</Link>
                    <Link onClick={() => { setUser(null) }}>Log Out</Link>
                </div>
                :
                <div className="header-r">
                    <GoogleAuth user={user} setUser={setUser} />
                </div>
            }
        </div >
    )

}
