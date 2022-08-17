const mongoose = require("mongoose")
const slugify = require("slugify")
const createDomPurify = require("dompurify")
const { JSDOM } = require("jsdom")

const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        keywords: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        markdown: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        sanitizedHTML: {
            type: String,
            required: true,
        },
        rubric: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rubric", // TODO is it required?
        },
        img: {
            type: String,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true }
)

articleSchema.pre("validate", function validate(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if (this.markdown) {
        this.sanitizedHTML = dompurify.sanitize(this.markdown)
    }

    next()
})

module.exports = mongoose.model("Article", articleSchema)
