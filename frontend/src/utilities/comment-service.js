import * as commentAPI from './comment-api.js';

export async function getCommentsByAlbumId(id) {
    try {
        const data = await commentAPI.getCommentsByAlbumId(id)
        return data
    } catch (err) {
        return err
    }
}