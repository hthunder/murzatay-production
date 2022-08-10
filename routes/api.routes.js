const express = require("express")
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
const authRouter = require("./api/auth/auth.routes")

router.get("/logged_in", isLoggedIn, (req, res) => {
    return res
        .status(200)
        .json({ isLoggedIn: req.isLoggedIn, userId: req.userId })
})

router.get("/id_from_slug", async (req, res, next) => {
    try {
        const article = await Article.findOne({ slug: req.query.slug }).lean()
        return res.status(200).json({ id: article._id })
    } catch (e) {
        next(e) // TODO check if it is needed operation
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
