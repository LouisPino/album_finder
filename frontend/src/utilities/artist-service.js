import * as artistAPI from './artist-api';

export async function getArtists() {
    try {
        const data = await artistAPI.index()
        return data
    } catch (err) {
        return err
    }
}

export async function findByArtist(artist) {
    try {
        const data = await artistAPI.findByArtist(artist)
        return data
    } catch (err) {
        return err
    }
}