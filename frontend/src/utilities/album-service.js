import * as albumAPI from './album-api';

export async function getAlbums() {
    try {
        const data = await albumAPI.index()
        return data
    } catch (err) {
        return err
    }
}
