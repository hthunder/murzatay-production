const express = require("express")
const { authenticate } = require("../../middlewares/api/authentication")
const { articleRemove } = require("../../controllers/api/articles.controller")
const { isLoggedIn } = require("../../middlewares/authJwt")
const apiController = require("../../controllers/api.controller")

const articlesRouter = express.Router()

articlesRouter.delete("/:id", authenticate, articleRemove)

articlesRouter.get(
    "/:articleId/comments",
    isLoggedIn,
    apiController.articleComments_get
)

module.exports = articlesRouter
