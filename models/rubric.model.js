const mongoose = require("mongoose")
const slugify = require("slugify")
const { RUBRICS } = require("../constants")

const rubricSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: RUBRICS,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
})

rubricSchema.pre("validate", function validate(next) {
    if (this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true })
    }
    next()
})

module.exports = mongoose.model("Rubric", rubricSchema)
