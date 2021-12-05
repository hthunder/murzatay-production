const mongoose = require("mongoose")
const createDomPurify = require("dompurify")
const { JSDOM } = require("jsdom")

const dompurify = createDomPurify(new JSDOM().window)

const landingSchema = new mongoose.Schema({
    markdown: {
        type: String,
        required: true,
    },
    sanitizedHTML: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    path: {
        type: String,
        required: true,
    },
})

landingSchema.pre("findOneAndUpdate", function validate(next) {
    if (this.getUpdate().markdown) {
        this.setUpdate({
            ...this.getUpdate(),
            sanitizedHTML: dompurify.sanitize(this.getUpdate().markdown),
        })
    }

    next()
})

module.exports = mongoose.model("Landing", landingSchema)
