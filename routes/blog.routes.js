const { Router } = require("express")

const router = Router()
const nodemailer = require("nodemailer")
const Article = require("../models/article.model")
const User = require("../models/user.model")
const Comment = require("../models/comment.model")
const { getPhotosList } = require("../util/getPhotosList")

router.get("/", async (req, res) => {
    const articles = await Article.find().sort("-createdAt").limit(2).lean()
    const lastComments = await Comment.find()
        .sort({ date: -1 })
        .limit(2)
        .populate("user")
        .lean()

    const [shownPhotos, hiddenPhotos] = await getPhotosList()
    res.render("index", {
        layout: false,
        isLoggedIn: req.isLoggedIn,
        lastComments,
        articles,
        shownPhotos,
        hiddenPhotos,
    })
})

router.post("/mails", async (req, res) => {
    const { email } = req.body
    const { question } = req.body
    const { referer } = req.headers

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nosov.yura.web@gmail.com",
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: "Nosov.yura.web@gmail.com",
        to: "Nosov_yura@inbox.ru",
        subject: "форма обратной связи",
        text: `Текст обращения: ${question}\nemail для обратной связи: ${email}`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email sent: ${info.response}`)
        }
    })

    return res.redirect(referer)
})

router.get("/about", async (req, res) => {
    try {
        const lastComments = await Comment.find()
            .sort({ date: -1 })
            .limit(2)
            .populate("user")
            .lean()
        const [shownPhotos, hiddenPhotos] = await getPhotosList()
        res.render("about", {
            layout: false,
            lastComments,
            isLoggedIn: req.isLoggedIn,
            shownPhotos,
            hiddenPhotos,
        })
    } catch (e) {
        console.log(e)
    }
})

router.get("/my-page", async (req, res) => {
    if (!req.isLoggedIn) {
        return res.redirect("/")
    }
    const { errors } = req.cookies
    res.clearCookie("errors")
    const user = await User.findOne({ _id: req.userId })
        .select("-password")
        .lean()
    if (!user.avatar) user.avatar = "/img/icons/user-profile.svg"
    const articles = await Article.find({
        _id: { $in: user.favourites },
    }).lean()
    const comments = await Comment.find({ user: req.userId })
        .sort({ date: -1 })
        .limit(2)
        .lean()
    const lastComments = await Comment.find()
        .sort({ date: -1 })
        .limit(2)
        .populate("user")
        .lean()

    const [shownPhotos, hiddenPhotos] = await getPhotosList()
    return res.render("my-page", {
        layout: false,
        user,
        errors,
        articles,
        comments,
        lastComments,
        isLoggedIn: req.isLoggedIn,
        shownPhotos,
        hiddenPhotos,
    })
})

module.exports = router
