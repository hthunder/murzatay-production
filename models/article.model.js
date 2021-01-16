const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    markdown: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    sanitizedHTML: {
      type: String,
      required: true
    },
    rubric: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rubric'
    },
    img: {
      type: String
    }
  },
  { timestamps: true }
);

articleSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHTML = dompurify.sanitize(marked(this.markdown));
  }

  next();
});

module.exports = mongoose.model('Article', articleSchema);
