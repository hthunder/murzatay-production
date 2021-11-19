const { Router } = require("express")

const router = Router()
const Article = require("../models/article.model")
const User = require("../models/user.model")
const Comment = require("../models/comment.model")

router.get("/", async (req, res) => {
    try {
        const articles = await Article.find().sort("-createdAt").limit(2).lean()

        return res.render("index", {
            layout: false,
            isLoggedIn: req.isLoggedIn,
            articles,
        })
    } catch (e) {
        return res.status(500).send()
    }
})

router.get("/about", async (req, res) => {
    try {
        return res.render("about", {
            layout: false,
            isLoggedIn: req.isLoggedIn,
        })
    } catch (e) {
        return res.status(500).send()
    }
})

router.get("/my-page", async (req, res) => {
    try {
        const { userId } = req

        if (!req.isLoggedIn) {
            return res.redirect("/")
        }
        const { errors } = req.cookies
        res.clearCookie("errors")

        const { favourites, avatar = "/img/icons/user-profile.svg" } =
            await User.findById(userId, "favourites avatar")
                .populate("favourites", "img title description slug")
                .lean()

        const comments = await Comment.find({ user: userId })
            .sort({ date: -1 })
            .limit(2)
            .lean()

        return res.render("my-page", {
            layout: false,
            userId,
            avatar,
            errors,
            articles: favourites,
            comments,
            isLoggedIn: req.isLoggedIn,
        })
    } catch (e) {
        return res.status(500).send()
    }
})

module.exports = router
