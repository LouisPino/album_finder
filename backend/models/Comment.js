const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const commentSchema = new Schema({
    content: String,
    user_id: { type: Types.ObjectId, ref: 'User' },
    user_name: String,
    album_id: { type: Types.ObjectId, ref: 'Album' },
}, {
    timestamps: true
});


module.exports = mongoose.model('Comment', commentSchema); 