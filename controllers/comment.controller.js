const mongoose = require("mongoose")
const Comment = require("../models/comment.model")
const Article = require("../models/article.model")

exports.comment_add = async (req, res) => {
    try {
        const { articleId } = req.body
        const { referer } = req.headers
        const comment = new Comment({
            _id: new mongoose.Types.ObjectId(),
            user: req.userId,
            text: req.body.text,
        })
        await comment.save()
        const article = await Article.findById(articleId)
        // eslint-disable-next-line no-underscore-dangle
        article.comments.push(comment._id)
        await article.save()

        res.redirect(referer)
    } catch (e) {
        console.log(e)
    }
}
