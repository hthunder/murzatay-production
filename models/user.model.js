const mongoose = require("mongoose")
const escapeHtml = require("escape-html")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    city: { type: String, default: "" },
    role: {
        type: String,
        enum: ["user", "moderator", "admin"],
        required: true,
        default: "user",
    },
    active: {
        type: Boolean,
        default: false,
    },
    activationHash: {
        type: String,
        unique: true,
    },
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
        },
    ],
    visitedArticles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
        },
    ],
    about: { type: String, default: "" },
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
