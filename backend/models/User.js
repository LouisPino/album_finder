const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const userSchema = new Schema({
    email: {
        required: true,
        unique: true,
        type: String,
    },
    name: {
        required: true,
        type: String
    },
    favorites: [{ type: Types.ObjectId, ref: 'Album' }],
    authSource: {
        enum: ["self", "google"],
    }
});
module.exports = mongoose.model('User', userSchema); 