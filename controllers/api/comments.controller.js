const Comment = require("../../models/comment.model")
const Article = require("../../models/article.model")
const { LONG_COMMENT } = require("../../constants")
const { HttpError } = require("../../util/HttpError")

exports.comments_get = async (req, res, next) => {
    try {
        const { limit } = req.query
        const comments = await Comment.find({}, "text user")
            .populate("user", "avatar username")
            .limit(parseInt(limit, 10))
            .sort({ date: -1 })
            .lean()
        return res.status(200).json(comments)
    } catch (e) {
        return next(e)
    }
}

exports.comment_post = async (req, res, next) => {
    try {
        const { articleId } = req.body

        if (req.body.text.length <= 500) {
            const comment = await Comment.create({
                user: req.userId,
                text: req.body.text,
            })
            const populatedComment = (
                await comment
                    .populate({ path: "user", select: "username avatar" })
                    .execPopulate()
            ).toObject()
            populatedComment.isEditable = true
            populatedComment.isDeletable = true
            const article = await Article.findById(articleId)
            article.comments.push(comment._id)
            await article.save()
            return res.status(200).json(populatedComment)
        }
        throw new HttpError(LONG_COMMENT, 400)
    } catch (e) {
        return next(e)
    }
}

exports.comment_delete = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)
        if (!comment) {
            throw new HttpError("Такого комментария не существует", 404)
        }
        return res.status(200).send("Комментарий успешно удален")
    } catch (e) {
        return next(e)
    }
}

exports.comment_put = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                text: req.body.text,
            },
            { new: true }
        ).lean()
        if (!comment) {
            throw new HttpError("Такого комментария не существует", 404)
        }
        return res.status(200).json({ text: comment.text })
    } catch (e) {
        return next(e)
    }
}
