const { Album } = require("../models");

module.exports = {
    create,
    index
};

async function create(req, res) {
    console.log(req.body)
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


function returnString() {
    return "hit test"
}

function logString() {
    return "hit test Log"
}