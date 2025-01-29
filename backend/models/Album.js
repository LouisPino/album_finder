const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    title: String,
    description: String,
    artist: String,
    uploader: String,
    email: String,
    link: String,
    image: String,
    categories: [String]
}, {
    timestamps: true
});


module.exports = mongoose.model('Album', albumSchema); 