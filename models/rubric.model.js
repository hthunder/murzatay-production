const mongoose = require("mongoose")
// const marked = require("marked")
const slugify = require("slugify")
// const createDomPurify = require("dompurify")
// const { JSDOM } = require("jsdom")

// const dompurify = createDomPurify(new JSDOM().window)

const rubricSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: [
            "Кормление",
            "Воспитание",
            "Уход",
            "Адаптация",
            "Пора к ветеринару?",
            "Коты доноры",
            "Коты спинальники",
            "Интересные факты",
            "Забавные истории",
        ],
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
