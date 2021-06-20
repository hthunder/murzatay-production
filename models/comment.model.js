const mongoose = require("mongoose")
const escapeHtml = require('escape-html')

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
})

commentSchema.pre("validate", function validate(next) {
    if (this.text) {
        this.text = escapeHtml(this.text)
    }
    next()
})

module.exports = mongoose.model("Comment", commentSchema)
