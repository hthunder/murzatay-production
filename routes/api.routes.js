const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const upload = require("../middlewares/articleImgHandler")
// const { isAd
const { avatarUploader } = require("../util/avatarUploader")
const { authenticate, authorize } = require("../middlewares/api/authentication")
const validators = require("../middlewares/validators")
const { CLIENT_500_ERROR } = require("../constants")
const {
    authorizeOwner,
    authCommentDelete,
    authCommentEdit,
} = require("../middlewares/api/permissions")
const { isLoggedIn, isActivated } = require("../middlewares/authJwt")
const { HttpError } = require("../util/HttpError")
const articlesRouter = require("./api/articles.routes")
const Article = require("../models/article.model")
const User = require("../models/user.model")
const config = require("../config/auth.config")
const { createHash, mailService } = require("../util")

const router = express.Router()
const apiController = require("../controllers/api.controller")
// const { articleRemove } = require("../controllers/api/articles.controller")

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

const isUserExisted = (user) => {
    return Boolean(user)
}

const isUserNotExisted = (user) => {
    return !isUserExisted(user)
}

const isPasswordCorrect = (s, hash) => {
    return bcrypt.compareSync(s, hash)
}

const isPasswordWrong = (s, hash) => {
    return !isPasswordCorrect(s, hash)
}

const issueToken = (payload, expiresIn) => {
    return jwt.sign(payload, config.secret, {
        expiresIn, // TODO make sure that users are not unlogged every day
    })
}

router.post("/signin", isActivated, async (req, res) => {
    // TODO make subroute /api/auth/... for authorization actions
    try {
        const { user } = req

        if (
            isUserNotExisted(user) ||
            isPasswordWrong(req.body.password, user.password)
        ) {
            return res
                .status(400)
                .json({ errors: ["Пользователь с такими данными не найден."] })
        }

        const { id, role } = user
        const token = issueToken({ id, role }, 86400)

        return res
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: true,
            })
            .status(200)
            .send()
    } catch (e) {
        return res.status(500).json({
            errors: ["Произошла какая-то ошибка, попробуйте еще раз позднее"],
        })
    }
})

router.post("/signup", validators.signup, async (req, res) => {
    try {
        const clientErrors = validationResult(req)
        if (!clientErrors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: clientErrors.errors.map((error) => error.msg) })
        }

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            city: req.body.city,
            password: bcrypt.hashSync(req.body.password1, 8),
            activationHash: createHash(),
        })
        await user.save()

        const { protocol } = req
        mailService(
            user.email,
            "Подтверждение регистрации на сайте",
            `${protocol}://${req.get("host")}/auth/activation?h=${
                user.activationHash
            }`
        )

        return res.status(200).send()
    } catch (e) {
        return res.status(500).json({ errors: [CLIENT_500_ERROR] })
    }
})

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
