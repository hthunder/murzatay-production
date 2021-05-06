const express = require("express")
const mongoose = require("mongoose")
const upload = require("../middlewares/articleImgHandler")
const { isAdmin } = require("../middlewares/authJwt")

const router = express.Router()
const User = require("../models/user.model")
const Comment = require("../models/comment.model")
const Article = require("../models/article.model")
const { LONG_COMMENT, NOT_LOGGED_IN } = require("../constants")
const { errorHandler } = require("../util/errorHandler")

router.put("/users/:id", async (req, res) => {
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
})

// article images upload handler
// url: /api/images
// method: post
// admin route
// private

router.post("/images", isAdmin, upload.single("file"), async (req, res) => {
    const location = req.file.path.substring("public".length)
    return res.json({ location })
})

// todo добавить возможность редактировать комменты админу

// comment editing
// url: /api/comments/:id
// method: put
// user route
// private

router.put("/comments/:id", async (req, res) => {
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
})

// todo добавить возможность удалять комменты админу

// comment deleting
// url: /api/comments/:id
// method: delete
// user route
// private

router.delete("/comments/:id", async (req, res) => {
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
})

// comment adding
// url: /api/comments
// method: post
// user route
// private

router.post("/comments", async (req, res) => {
    try {
        const { articleId } = req.body
        let comment
        if (!req.userId) {
            throw new Error(NOT_LOGGED_IN)
        }
        let populatedComment
        if (req.body.text.length <= 500) {
            comment = new Comment({
                _id: new mongoose.Types.ObjectId(),
                user: req.userId,
                text: req.body.text,
            })
            await comment.save()
            populatedComment = await (await Comment.findById(comment._id))
                .populate("user")
                .execPopulate()

            const article = await Article.findById(articleId)
            // eslint-disable-next-line no-underscore-dangle
            article.comments.push(comment._id)
            await article.save()
        } else {
            throw new Error(LONG_COMMENT)
        }
        return res.status(200).json({
            commentId: populatedComment._id,
            author: populatedComment.user.username,
            comment: populatedComment.text,
            date: populatedComment.date,
        })
    } catch (e) {
        return errorHandler(e.message, res)
    }
})

module.exports = router
