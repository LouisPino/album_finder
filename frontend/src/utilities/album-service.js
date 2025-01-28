import * as albumAPI from './album-api';

export async function getAlbums() {
    try {
        const data = await albumAPI.index()
        return data
    } catch (err) {
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
