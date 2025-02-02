import * as commentAPI from './comment-api.js';

export async function getCommentsByAlbumId(id) {
    try {
        const data = await commentAPI.getCommentsByAlbumId(id)
        return data
    } catch (err) {
        return err
    }
}

export async function addComment(comment) {
    try {
        const data = await commentAPI.addComment(comment)
        return data
    } catch (err) {
        return err
    }
}

export async function deleteComment(id) {
    try {
        const data = await commentAPI.deleteComment(id)
        return data
    } catch (err) {
        return err
    }
}