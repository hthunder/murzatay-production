const express = require("express")
const upload = require("../middlewares/articleImgHandler")
const { isAdmin } = require("../middlewares/authJwt")

const router = express.Router()
const apiController = require("../controllers/api.controller")

router.put("/users/:id", apiController.user_put)

// article images upload handler
// url: /api/images
// method: post
// admin route
// private

router.post("/images", isAdmin, upload.single("file"), apiController.image_post)

// todo добавить возможность редактировать комменты админу

// comment editing
// url: /api/comments/:id
// method: put
// user route
// private

router.put("/comments/:id", apiController.comment_put)

// todo добавить возможность удалять комменты админу

// comment deleting
// url: /api/comments/:id
// method: delete
// user route
// private

router.delete("/comments/:id", apiController.comment_delete)

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

router.post("/comments", apiController.comment_post)

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

module.exports = router
