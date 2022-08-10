const express = require("express")
const { isLoggedIn } = require("../../middlewares/authJwt")
const { authorize } = require("../../middlewares/api/authentication")
const usersController = require("../../controllers/api/users.controller")
const { avatarUploader } = require("../../util/avatarUploader")

const usersRouter = express.Router()

usersRouter.get("/me", isLoggedIn, usersController.logged_in_user_get)

// get user's info
// url: /api/users/:id
// method: get
// user route
// private

usersRouter.get(
    "/:id",
    isLoggedIn,
    authorize(["owner", "moderator", "admin"]),
    usersController.user_get
)

// url: /api/users/me/articles/:articleId
usersRouter.put(
    "/me/articles/:articleId",
    isLoggedIn,
    usersController.user_favourite_put
)

// url: /api/users/me/articles/:articleId
usersRouter.delete(
    "/me/articles/:articleId",
    isLoggedIn,
    usersController.user_favourite_delete
)

// update user's info
// url: /api/users/:id
// method: patch
// user route
// private

usersRouter.patch(
    "/:id",
    isLoggedIn,
    authorize(["owner", "moderator", "admin"]),
    avatarUploader.single("avatar"),
    usersController.user_patch
)

module.exports = usersRouter
