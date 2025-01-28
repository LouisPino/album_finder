
const BASE_URL = process.env.REACT_APP_BASE_URL

export async function index() {
    const res = await fetch(`${BASE_URL}/albums`, {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
        },
    });
    if (res.ok) {
        return res.json();
    } else {
        return new Error("Invalid Request");
    }
}
