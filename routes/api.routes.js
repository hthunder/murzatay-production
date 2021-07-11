const express = require("express")
const upload = require("../middlewares/articleImgHandler")
const { isAdmin } = require("../middlewares/authJwt")
const { avatarUploader } = require("../util/avatarUploader")
const { authentication } = require("../middlewares/api/authentication")
const {
    authorizeOwner,
    authCommentDelete,
    authCommentEdit,
} = require("../middlewares/api/permissions")
const { HttpError } = require("../util/HttpError")

const router = express.Router()
const apiController = require("../controllers/api.controller")

// get urls of widget images
// url: /api/widget-urls
// method: get
// user route
// public

router.get("/widget-urls", apiController.widget_urls_get)

// get user's info
// url: /api/users/:id
// method: get
// user route
// private

router.get("/users/:id", authentication, authorizeOwner, apiController.user_get)

// update user's info
// url: /api/users/:id
// method: patch
// user route
// private

router.patch(
    "/users/:id",
    authentication,
    authorizeOwner,
    avatarUploader.single("avatar"),
    apiController.user_patch
)

router.put("/users/:id", authentication, authorizeOwner, apiController.user_put)

// article images upload handler
// url: /api/images
// method: post
// admin route
// private

router.post("/images", isAdmin, upload.single("file"), apiController.image_post)

// comments getting
// url: /api/comments
// method: get
// public

router.get("/comments", apiController.comments_get)

// comment editing
// url: /api/comments/:id
// method: put
// user route
// private

router.put(
    "/comments/:id",
    authentication,
    authCommentEdit,
    apiController.comment_put
)

// comment deleting
// url: /api/comments/:id
// method: delete
// user route
// private

router.delete(
    "/comments/:id",
    authentication,
    authCommentDelete(["admin", "moderator"]),
    apiController.comment_delete
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

router.post("/comments", authentication, apiController.comment_post)

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

router.get("/articles/:articleId/comments", apiController.articleComments_get)

router.all("*", (req, res, next) => {
    next(new HttpError("Запрашиваемый url не существует", 404))
})

// eslint-disable-next-line no-unused-vars
router.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500
    return res.status(error.statusCode).json({ message: error.message })
})

module.exports = router
