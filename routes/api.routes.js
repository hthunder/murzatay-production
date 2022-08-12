const express = require("express")
const createError = require("http-errors")
const upload = require("../middlewares/articleImgHandler")
const { authorize } = require("../middlewares/api/authentication")
const { isLoggedIn } = require("../middlewares/authJwt")
const { HttpError } = require("../util/HttpError")
const articlesRouter = require("./api/articles.routes")
const usersRouter = require("./api/users.routes")
const Article = require("../models/article.model")

const router = express.Router()
const apiController = require("../controllers/api.controller")
const commentsRouter = require("./api/comments.routes")
const authRouter = require("./api/auth.routes")
const { errorHandlerMiddleware } = require("../middlewares/api/error-handler")

router.get("/logged_in", isLoggedIn, (req, res) => {
    return res
        .status(200)
        .json({ isLoggedIn: req.isLoggedIn, userId: req.userId })
})

router.get("/id_from_slug", async (req, res, next) => {
    try {
        const article = await Article.findOne({ slug: req.query.slug }).lean()
        return res.status(200).json({ id: article._id })
    } catch (err) {
        return next(createError(500, err))
    }
})

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

router.use("/articles", authorize("admin"), articlesRouter)
router.use("/users", usersRouter)
router.use("/comments", commentsRouter)
router.use("/auth", authRouter)

router.all("*", isLoggedIn, (req, res, next) => {
    next(new HttpError("Запрашиваемый url не существует", 404))
})

router.use(errorHandlerMiddleware)

module.exports = router
