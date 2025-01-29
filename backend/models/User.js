const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    password: {
        required: false,
        type: String
    },
    authSource: {
        enum: ["self", "google"],
    }
});
module.exports = mongoose.model('User', userSchema); 