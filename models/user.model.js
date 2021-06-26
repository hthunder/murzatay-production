const mongoose = require("mongoose")
const escapeHtml = require('escape-html')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    city: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        },
    ],
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
        },
    ],
    about: String,
    avatar: String,
})

userSchema.pre("validate", function validate(next) {
    if (this.username) {
        this.username = escapeHtml(this.username)
    }
    next()
})

// module.exports = User
module.exports = mongoose.model("User", userSchema)
