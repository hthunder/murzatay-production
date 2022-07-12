const Article = require("../models/article.model")
const Comment = require("../models/comment.model")
const User = require("../models/user.model")
const { LONG_COMMENT } = require("../constants")
const { HttpError } = require("../util/HttpError")
const { getPhotosList } = require("../util/getPhotosList")

exports.widget_urls_get = async (req, res, next) => {
    try {
        const imgList = await getPhotosList()
        return res.status(200).json({ imgList })
    } catch (e) {
        return next(e)
    }
}

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

exports.user_get = async (req, res, next) => {
    try {
        const userId = req.params.id
        const user = await User.findById(
            userId,
            "about avatar city username"
        ).lean()
        if (!user) {
            throw new HttpError("Пользователь с таким id не существует", 404)
        }

        return res.status(200).json(user)
    } catch (e) {
        return next(e)
    }
}

const getFavouritesInfo = async (userId, articleId) => {
    const { favourites } = await User.findById(userId)
    const index = favourites.indexOf(articleId)
    if (index === -1) {
        favourites.push(articleId)
    } else {
        favourites.splice(index, 1)
    }
    return favourites
}

exports.user_patch = async (req, res, next) => {
    try {
        const userId = req.params.id
        const userData = req.body

        if (req.file) userData.avatar = `/${req.file.path.split("public/")[1]}`
        if (userData.favourites) {
            userData.favourites = await getFavouritesInfo(
                userId,
                userData.favourites
            )
        }

        const user = await User.findByIdAndUpdate(userId, userData, {
            new: true,
            fields: "about avatar city username favourites",
        }).lean()

        if (!user) {
            throw new HttpError("Пользователь с таким id не существует", 404)
        }

        return res.status(200).json(user)
    } catch (e) {
        return next(e)
    }
}

exports.image_post = async (req, res) => {
    const location = req.file.path.substring("public".length)
    return res.json({ location: `/static${location}` })
}
