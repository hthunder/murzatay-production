const mongoose = require("mongoose")
const Comment = require("../models/comment.model")
const Article = require("../models/article.model")

exports.comment_add = async (req, res) => {
    try {
        const { articleId } = req.body
        const { referer } = req.headers
        if (req.body.text.length <= 500) {
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
        }
        res.redirect(referer)
    } catch (e) {
        console.log(e)
    }
}

exports.comment_delete = async (req, res) => {
    const { referer } = req.headers
    try {
        const { commentId } = req.params
        if (req.body.authorId === req.userId || req.authorities?.admin) {
            await Comment.findByIdAndRemove(commentId)
        }
        return res.redirect(referer)
    } catch {
        return res.redirect(referer)
    }
}
