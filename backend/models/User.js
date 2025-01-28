const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = Schema({
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
        default: "self"
    }
});
module.exports = mongoose.model("User", userSchema);