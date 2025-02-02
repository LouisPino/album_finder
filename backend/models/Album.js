const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    title: String,
    description: String,
    artist: [String],
    uploader: String,
    email: String,
    link: String,
    image: String,
    release_year: Number,
    categories: [String]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

albumSchema.virtual('commentCount', {
    ref: 'Comment', // The model to count
    localField: '_id', // Field from the albums collection
    foreignField: 'album_id', // Field from the comments collection
    count: true // Enable counting
});



module.exports = mongoose.model('Album', albumSchema); 