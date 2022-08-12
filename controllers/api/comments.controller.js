const createError = require("http-errors")
const Comment = require("../../models/comment.model")
const Article = require("../../models/article.model")

exports.comments_get = async (req, res, next) => {
    try {
        const { limit } = req.query
        const comments = await Comment.find({}, "text user")
            .populate("user", "avatar username")
            .limit(parseInt(limit, 10))
            .sort({ date: -1 })
            .lean()
        return res.status(200).json(comments)
    } catch (err) {
        return next(createError(500, err))
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
        const error = createError(400, "Too much symbols")
        return next(error)
    } catch (err) {
        return next(createError(500, err))
    }
}

exports.comment_delete = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)
        if (!comment) {
            const error = createError(404, "Comment is not exist")
            return next(error)
        }
        return res.status(200).send("Комментарий успешно удален")
    } catch (err) {
        return next(createError(500, err))
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
            const error = createError(404, "Comment is not exist")
            return next(error)
        }
        return res.status(200).json({ text: comment.text })
    } catch (err) {
        return next(createError(500, err))
    }
}
