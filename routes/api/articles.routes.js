const express = require("express")
const {
    authenticate,
    authorize,
} = require("../../middlewares/api/authentication")
const {
    articleRemove,
    articleCommentsGet,
    articleGet,
    allArticlesGet,
} = require("../../controllers/api/articles.controller")
const { isLoggedIn } = require("../../middlewares/authJwt")
// const apiController = require("../../controllers/api.controller")
// const { authorize } = require("../../middlewares/api/authentication")

const articlesRouter = express.Router()

articlesRouter.delete("/:id", authenticate, authorize("admin"), articleRemove)

articlesRouter.get("/", allArticlesGet)

articlesRouter.get("/:articleId/comments", articleCommentsGet)

articlesRouter.get("/:articleId", articleGet)
// articlesRouter.get("/:articleId")

module.exports = articlesRouter
