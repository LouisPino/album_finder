const { Album, User } = require("../models");

module.exports = {
    create,
    index,
    getAlbumsByEmail,
    getUserSavedAlbumsById,
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
        res.status(200).json(await Album.aggregate([
            {
                $lookup: {
                    from: 'comments', // The name of the comments collection
                    localField: '_id',
                    foreignField: 'album_id',
                    as: 'comments'
                }
            },
            {
                $addFields: {
                    commentCount: { $size: '$comments' }
                }
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    artist: 1,
                    uploader: 1,
                    email: 1,
                    link: 1,
                    image: 1,
                    release_year: 1,
                    categories: 1,
                    commentCount: 1
                }
            }
        ]));
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

async function getUserSavedAlbumsById(req, res) {
    const user = await User.findById(req.params.id)
    const ids = user.favorites
    try {
        res.status(200).json(await Album.find({ '_id': { $in: ids } }));
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
    try {
        res.status(200).json(await Album.findByIdAndUpdate(req.params.id, req.body));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
