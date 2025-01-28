import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function Header() {
    const navigate = useNavigate()


    useEffect(() => {
        console.log("test")
    }, [])
    return (
        <div className="header">
            <Link to="/albums/add">Add Album</Link>
            <Link to="/">Home</Link>
            <Link to="/albums">View Albums</Link>
            <Link to="/artists">View Artists</Link>
        </div>
    )

}
