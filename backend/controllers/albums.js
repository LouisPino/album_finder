const { Album } = require("../models");

module.exports = {
    create,
    index,
    getAlbumsByEmail,
    deleteAlbumById,
    getAlbumById,
    editAlbum
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

async function getAlbumById(req, res) {
    try {
        res.status(200).json(await Album.findById(req.params.id));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function editAlbum(req, res) {
    console.log(req.body)
    try {
        res.status(200).json(await Album.findByIdAndUpdate(req.params.id, req.body));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
