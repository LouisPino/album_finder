const { Album, User, Comment } = require("../models");

module.exports = {
    addComment,
    deleteComment,
    getCommentsByAlbumId
};

async function addComment(req, res) {
    try {
        res.status(201).json(await Comment.create(req.body));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


async function getCommentsByAlbumId(req, res) {
    try {
        res.status(200).json(await Comment.find({ album_id: req.params.id }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteComment(req, res) {
    try {
        res.status(200).json(await Comment.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}