const express = require("express")
const { isLoggedIn } = require("../../middlewares/authJwt")
const commentsController = require("../../controllers/api/comments.controller")
const { authorize } = require("../../middlewares/api/authentication")
const {
    authCommentDelete,
    authCommentEdit,
} = require("../../middlewares/api/permissions")

const commentsRouter = express.Router()

// comments getting
// url: /api/comments
// method: get
// public

commentsRouter.get("/", isLoggedIn, commentsController.comments_get)

// comment editing
// url: /api/comments/:id
// method: put
// user route
// private

commentsRouter.put(
    "/:id",
    isLoggedIn,
    authorize(),
    authCommentEdit,
    commentsController.comment_put
)

// comment deleting
// url: /api/comments/:id
// method: delete
// user route
// private

commentsRouter.delete(
    "/:id",
    isLoggedIn,
    authorize(),
    authCommentDelete(["admin", "moderator"]),
    commentsController.comment_delete
)

// comment adding
// url: /api/comments
// method: post
// user route
// private
// return format
// [
//     {
//         _id: commentId,
//         user: {
//             _id: userId,
//             username,
//             avatar
//         },
//         text,
//         date,
//         isEditable: true
//     }
// ]

commentsRouter.post(
    "/",
    isLoggedIn,
    authorize(),
    commentsController.comment_post
)

// get all comments
// url: /api/articles/:articleId/comments
// method: get
// user route
// public
// return format
// [
//     {
//         _id: commentId,
//         user: {
//             _id: userId,
//             username,
//             avatar
//         },
//         text,
//         date,
//         isEditable // only returns true if isEditable
//     }
// ]

module.exports = commentsRouter
