const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", itemSchema);
module.exports = User;