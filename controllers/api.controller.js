const Article = require("../models/article.model")
const Comment = require("../models/comment.model")
const User = require("../models/user.model")
const { LONG_COMMENT, NOT_LOGGED_IN } = require("../constants")
const { errorHandler } = require("../util/errorHandler")
const { HttpError } = require("../util/HttpError")

exports.articleComments_get = async (req, res) => {
    try {
        const { articleId } = req.params
        const { userId } = req
        const { comments } = await Article.findById(articleId, "comments")
            .populate({
                path: "comments",
                options: { sort: { date: -1 } },
                populate: { path: "user", select: "username avatar" },
            })
            .lean()
        if (userId) {
            const modifiedComments = comments.map((comment) => {
                // eslint-disable-next-line no-underscore-dangle
                if (comment.user._id.toString() === userId.toString()) {
                    comment.isEditable = true
                }
                return comment
            })
            return res.status(200).json(modifiedComments)
        }
        return res.status(200).json(comments)
    } catch (e) {
        console.log(e)
    }
}

exports.comment_post = async (req, res) => {
    try {
        const { articleId } = req.body
        if (!req.userId) {
            throw new Error(NOT_LOGGED_IN)
        }

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
            const article = await Article.findById(articleId)
            // eslint-disable-next-line no-underscore-dangle
            article.comments.push(comment._id)
            await article.save()
            return res.status(200).json(populatedComment)
        }
        throw new Error(LONG_COMMENT)
    } catch (e) {
        console.log(e)
        return errorHandler(e.message, res)
    }
}

exports.comment_delete = async (req, res) => {
    try {
        if (req.isLoggedInErrors) {
            throw new Error("You are not logged in")
        }
        const comment = await Comment.findOneAndDelete({
            _id: req.params.id,
            user: req.userId,
        })
        if (!comment) {
            throw new Error("You can't delete the comment or it is not existed")
        }
        return res.status(200).send("The comment is deleted successfully")
    } catch (e) {
        return res.status(403).send(e.message)
    }
}

exports.comment_put = async (req, res) => {
    try {
        if (req.isLoggedInErrors) {
            throw new Error("You are not logged in")
        }
        const comment = await Comment.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            {
                text: req.body.text,
            },
            { new: true }
        ).lean()
        if (!comment) {
            throw new Error("You can't edit the comment")
        }
        return res.status(200).json({ text: comment.text })
    } catch (e) {
        return res.status(403).send(e.message)
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

exports.user_patch = async (req, res, next) => {
    try {
        const userId = req.params.id
        const userData = req.body

        const tempUser = await User.findOne({
            username: req.body.username,
        }).lean()
        // eslint-disable-next-line no-underscore-dangle
        if (tempUser && tempUser._id.toString() !== userId) {
            throw new HttpError(
                "Пользователь с таким именем уже существует",
                409
            )
        }

        if (req.file) userData.avatar = `/${req.file.path.split("public/")[1]}`

        const user = await User.findByIdAndUpdate(userId, userData, {
            new: true,
            fields: "about avatar city username",
        }).lean()

        if (!user) {
            throw new HttpError("Пользователь с таким id не существует", 404)
        }

        return res.status(200).json(user)
    } catch (e) {
        return next(e)
    }
}

exports.user_put = async (req, res) => {
    try {
        const userId = req.params.id
        let message = ""

        if (req.userId !== userId) {
            return res.status(403).json({ message: "This action is forbidden" })
        }

        const user = await User.findById(userId)
        const updates = req.body

        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" })
        }

        const resJSON = {}
        if (updates.favourites) {
            const index = user.favourites.indexOf(updates.favourites)
            if (index !== -1) {
                message = "Removed from favourites"
                user.favourites.splice(index, 1)
                resJSON.favourites = false
            } else {
                message = "Added to favourites"
                user.favourites.push(updates.favourites)
                resJSON.favourites = true
            }
        }

        const updatedUser = await user.save()
        resJSON.message = message
        resJSON.user = updatedUser
        return res.status(200).json(resJSON)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

exports.image_post = async (req, res) => {
    const location = req.file.path.substring("public".length)
    return res.json({ location })
}
