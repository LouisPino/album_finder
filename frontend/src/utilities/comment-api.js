
const BASE_URL = process.env.REACT_APP_BASE_URL

export async function create(data) {
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        return res.json();
    } else {
        return new Error("Invalid Request");
    }
}

export async function getCommentsByAlbumId(id) {
    const res = await fetch(`${BASE_URL}/comments/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        return res.json();
    } else {
        return new Error("Invalid Request");
    }
}
