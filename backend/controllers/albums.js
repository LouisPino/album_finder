const { Album } = require("../models");

module.exports = {
    create,
    index,
    getAlbumsByEmail,
    deleteAlbumById
};

async function create(req, res) {
    try {
        res.status(201).json(await Album.create(req.body));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function index(req, res) {
    try {
        res.status(200).json(await Album.find());
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAlbumsByEmail(req, res) {
    try {
        res.status(200).json(await Album.find({ email: req.params.email }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteAlbumById(req, res) {
    try {
        res.status(200).json(await Album.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
