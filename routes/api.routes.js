const express = require("express")
const upload = require("../middlewares/articleImgHandler")
// const { isAd
const { avatarUploader } = require("../util/avatarUploader")
const { authenticate, authorize } = require("../middlewares/api/authentication")
const {
    authorizeOwner,
    authCommentDelete,
    authCommentEdit,
} = require("../middlewares/api/permissions")
const { isLoggedIn } = require("../middlewares/authJwt")
const { HttpError } = require("../util/HttpError")
const articlesRouter = require("./api/articles.routes")

const router = express.Router()
const apiController = require("../controllers/api.controller")
// const { articleRemove } = require("../controllers/api/articles.controller")

// get urls of widget images
// url: /api/widget-urls
// method: get
// user route
// public

router.get("/widget-urls", isLoggedIn, apiController.widget_urls_get)

// get user's info
// url: /api/users/:id
// method: get
// user route
// private

router.get(
    "/users/:id",
    isLoggedIn,
    authorize(["owner", "moderator", "admin"]),
    apiController.user_get
)

// update user's info
// url: /api/users/:id
// method: patch
// user route
// private

router.patch(
    "/users/:id",
    isLoggedIn,
    authorize(["owner", "moderator", "admin"]),
    avatarUploader.single("avatar"),
    apiController.user_patch
)

// article images upload handler
// url: /api/images
// method: post
// admin route
// private

router.post(
    "/images",
    isLoggedIn,
    authorize("admin"),
    upload.single("file"),
    apiController.image_post
)

// comments getting
// url: /api/comments
// method: get
// public

router.get("/comments", isLoggedIn, apiController.comments_get)

// comment editing
// url: /api/comments/:id
// method: put
// user route
// private

router.put(
    "/comments/:id",
    isLoggedIn,
    authorize(),
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
    isLoggedIn,
    authorize(),
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

router.post("/comments", isLoggedIn, authorize(), apiController.comment_post)

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

router.get(
    "/articles/:articleId/comments",
    isLoggedIn,
    apiController.articleComments_get
)

// Here will be refactored code

router.use("/articles", authorize("admin"), articlesRouter)

router.all("*", isLoggedIn, (req, res, next) => {
    next(new HttpError("Запрашиваемый url не существует", 404))
})

// eslint-disable-next-line no-unused-vars
router.use((error, req, res, next) => {
    if (error.codeName === "DuplicateKey") {
        error.statusCode = 409
        if (error.keyPattern && error.keyPattern.username === 1) {
            error.message =
                "Пользователь с данным именем уже существует. Выберите другое имя пользователя."
        }
    }
    if (!error.statusCode) error.statusCode = 500
    return res.status(error.statusCode).json({ message: error.message })
})

module.exports = router
