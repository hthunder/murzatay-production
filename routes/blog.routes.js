const { Router } = require("express")

const router = Router()
const multer = require("multer")
const fs = require("fs")
const Article = require("../models/article.model")
const User = require("../models/user.model")
const Comment = require("../models/comment.model")
const Landing = require("../models/landing.model")
const { landingGet, landingPost } = require("../controllers/blog.controller")
const { isAdmin } = require("../middlewares/authJwt")

if (!fs.existsSync("./public/img/landings")) {
    fs.mkdirSync("./public/img/landings", { recursive: true })
}

const storage = multer.diskStorage({
    destination: "./public/img/landings",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.${file.mimetype.split("/")[1]}`)
    },
})

const upload = multer({ storage })

router.get("/", async (req, res) => {
    try {
        const articles = await Article.find().sort("-createdAt").limit(2).lean()
        const landing = await Landing.findOne({
            path: "/index/edit",
        }).lean()
        return res.render("index", {
            layout: false,
            isLoggedIn: req.isLoggedIn,
            articles,
            sanitizedHTML: landing.sanitizedHTML,
            img: landing.img,
        })
    } catch (e) {
        return res.status(500).send()
    }
})

router.get("/about", async (req, res) => {
    try {
        const landing = await Landing.findOne({
            path: "/about/edit",
        }).lean()
        return res.render("about", {
            layout: false,
            isLoggedIn: req.isLoggedIn,
            sanitizedHTML: landing.sanitizedHTML,
            img: landing.img,
        })
    } catch (e) {
        return res.status(500).send()
    }
})

router.get("/about/edit", isAdmin, landingGet)

router.get("/index/edit", isAdmin, landingGet)

router.post("/about/edit", isAdmin, upload.single("image"), landingPost)

router.post("/index/edit", isAdmin, upload.single("image"), landingPost)

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
            isAdmin: req.userRole === "admin",
        })
    } catch (e) {
        return res.status(500).send()
    }
})

module.exports = router
