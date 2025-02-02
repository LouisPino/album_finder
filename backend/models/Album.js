const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aggregate = MyModel.aggregate([{ $match: { answer: 42 } }]);

// Change the model. There's rarely any reason to do this.
aggregate.model(SomeOtherModel);
aggregate.model() === SomeOtherModel; // true
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

albumSchema.virtual('commentCount').get(5);

module.exports = mongoose.model('Album', albumSchema);
