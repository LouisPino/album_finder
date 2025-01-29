
const BASE_URL = process.env.REACT_APP_BASE_URL

export async function index() {
    const res = await fetch(`${BASE_URL}/albums`, {
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
export async function create(data) {

    const res = await fetch(`${BASE_URL}/albums/create`, {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
        },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        return res.json();
    } else {
        return new Error("Invalid Request");
    }
}


export async function getUserAlbums(user) {
    console.log(user)

    const res = await fetch(`${BASE_URL}/albums/${user.email}`, {
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

export async function getUserSavedAlbumsById(user) {
    const res = await fetch(`${BASE_URL}/albums/saved/${user._id}`, {
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

export async function deleteAlbumById(id) {
    const res = await fetch(`${BASE_URL}/albums/${id}`, {
        method: "DELETE",
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


export async function getAlbumById(id) {
    const res = await fetch(`${BASE_URL}/albums/id/${id}`, {
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


export async function editAlbum(album) {
    const res = await fetch(`${BASE_URL}/albums/edit/${album._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(album)
    });
    if (res.ok) {
        return res.json();
    } else {
        return new Error("Invalid Request");
    }
}