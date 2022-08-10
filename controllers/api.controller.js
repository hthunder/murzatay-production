const Article = require("../models/article.model")

exports.articleComments_get = async (req, res, next) => {
    const isLoggedIn = (userId) => {
        return Boolean(userId)
    }
    const isCommentOwner = (commentUserId, requestUserId) => {
        return commentUserId.toString() === requestUserId.toString()
    }
    const isAdminOrModerator = (userRole) => {
        return ["admin", "moderator"].includes(userRole)
    }
    try {
        const { articleId } = req.params
        const { userId, userRole } = req
        const { comments } = await Article.findById(articleId, "comments")
            .populate({
                path: "comments",
                options: { sort: { date: -1 } },
                populate: { path: "user", select: "username avatar" },
            })
            .lean()
        if (isLoggedIn(userId)) {
            const modifiedComments = comments.map((comment) => ({
                ...comment,
                isEditable: isCommentOwner(comment.user._id, userId),
                isDeletable:
                    isCommentOwner(comment.user._id, userId) ||
                    isAdminOrModerator(userRole),
            }))
            return res.status(200).json(modifiedComments)
        }
        return res.status(200).json(comments)
    } catch (e) {
        return next(e)
    }
}

exports.image_post = async (req, res) => {
    const location = req.file.path.substring("public".length)
    return res.json({ location: `/static${location}` })
}
