const { Album } = require("../models");

module.exports = {
    index,
    findByArtist
};

async function index(req, res) {
    try {
        res.status(200).json(await Album.distinct("artist"));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function findByArtist(req, res) {
    try {
        res.status(200).json(await Album.find({ artist: req.body.artist }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
