import * as albumAPI from './album-api';

export async function getAlbums() {
    try {
        console.log("try")
        const data = await albumAPI.index()
        console.log("data", data)
        return data
    } catch (err) {
        console.log("err", err)
        return err
    }
}

export async function addAlbum(albumInfo) {
    try {
        const data = await albumAPI.create(albumInfo)
        return data
    } catch (err) {
        return err
    }
}

export async function getUserAlbums(user) {
    try {
        const data = await albumAPI.getUserAlbums(user)
        return data
    } catch (err) {
        return err
    }
}

export async function getUserSavedAlbumsById(user) {
    try {
        const data = await albumAPI.getUserSavedAlbumsById(user)
        return data
    } catch (err) {
        return err
    }
}

export async function deleteAlbumById(id) {
    try {
        const data = await albumAPI.deleteAlbumById(id)
        return data
    } catch (err) {
        return err
    }
}

export async function getAlbumById(id) {
    try {
        const data = await albumAPI.getAlbumById(id)
        return data
    } catch (err) {
        return err
    }
}

export async function editAlbum(album) {
    try {
        const data = await albumAPI.editAlbum(album)
        return data
    } catch (err) {
        return err
    }
}
