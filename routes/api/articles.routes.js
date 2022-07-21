const express = require("express")
const { authenticate } = require("../../middlewares/api/authentication")
const { articleRemove } = require("../../controllers/api/articles.controller")

const articlesRouter = express.Router()

articlesRouter.delete("/:id", authenticate, articleRemove)

module.exports = articlesRouter
