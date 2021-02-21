const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const dompurify = createDomPurify(new JSDOM().window);

const rubricSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: [
            "Кормление",
            "Уход",
            "Адаптация",
            "Пора к ветеринару?",
            "Коты доноры",
            "Коты спинальники",
            "Интересные факты",
            "Забавные истории"
        ],
        required: true
    }
});

// rubricSchema.pre('validate', function (next) {
//   if (this.title) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//   }

//   if (this.markdown) {
//     this.sanitizedHTML = dompurify.sanitize(marked(this.markdown));
//   }

//   next();
// });

module.exports = mongoose.model("Rubric", rubricSchema);
