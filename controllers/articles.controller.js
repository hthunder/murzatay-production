const Article = require("../models/article.model")
const Rubric = require("../models/rubric.model")
const Comment = require("../models/comment.model")
const User = require("../models/user.model")
const util = require("../util/saveArticleAndRedirect")
const { getPhotosList } = require("../util/getPhotosList")

const getPaginationData = (page, numberOfArticles, limit) => {
    const current = parseInt(page, 10)
    let first = 1
    let last = Math.ceil(numberOfArticles / limit)
    const rangeBegin = Math.max(first, current - 2)
    const rangeEnd = Math.min(last, current + 2)
    const rangeBefore = []
    const rangeAfter = []
    for (let i = rangeBegin; i <= rangeEnd; i += 1) {
        if (i !== 1 && i !== last) {
            if (i < current) rangeBefore.push(i)
            else if (i > current) rangeAfter.push(i)
        }
    }
    if (last === 1 || last === current) last = null
    if (first === current) first = null
    const pointsBefore = first && rangeBegin > first + 1
    const pointsAfter = last && rangeEnd < last - 1
    return {
        first,
        current,
        last,
        pointsBefore,
        pointsAfter,
        rangeBefore,
        rangeAfter,
    }
}

exports.article_list = async (req, res) => {
    try {
        const limit = 1
        const { page = 1, category = "all" } = req.query
        let numberOfArticles

        if (page < 0 || page === 0) return res.redirect(`/articles`)

        const skip = limit * (page - 1)

        let articles

        const findPageArticles = (request) => {
            return Article.find(request)
                .sort("-createdAt")
                .skip(skip)
                .limit(limit)
                .lean()
        }

        if (category === "all") {
            articles = await findPageArticles({})
            numberOfArticles = await Article.countDocuments()
        } else {
            const rubric = await Rubric.findOne({ slug: category })
            if (!rubric) return res.redirect(`/articles`)
            // eslint-disable-next-line no-underscore-dangle
            articles = await findPageArticles({ rubric: rubric._id })
            numberOfArticles = await Article.countDocuments({
                // eslint-disable-next-line no-underscore-dangle
                rubric: rubric._id,
            })
        }

        const pagination = getPaginationData(page, numberOfArticles, limit)

        const lastComments = await Comment.find()
            .sort({ date: -1 })
            .limit(2)
            .populate("user")
            .lean()
        const [shownPhotos, hiddenPhotos] = await getPhotosList()
        return res.render("articles", {
            layout: false,
            pagination,
            articles,
            category,
            lastComments,
            isAdmin: req.authorities?.admin,
            isLoggedIn: req.isLoggedIn,
            shownPhotos,
            hiddenPhotos,
        })
    } catch (e) {
        console.log(e)
        return res.redirect(`/articles`)
    }
}

exports.articles_search = async (req, res) => {
    const searchRule = req.query?.text
    try {
        const articles = await Article.find({
            title: { $regex: searchRule, $options: "i" },
        }).lean()
        const lastComments = await Comment.find()
            .sort({ date: -1 })
            .limit(2)
            .populate("user")
            .lean()
        res.render("articles", {
            layout: false,
            lastComments,
            articles,
        })
    } catch (e) {
        res.status(500).end()
    }
}

exports.article_page = async (req, res) => {
    try {
        let favourite = false
        const article = await Article.findOne({ slug: req.params.slug })
            .populate("comments")
            .lean()
        if (article == null) res.redirect("/")
        let user
        if (req.isLoggedIn) {
            user = await User.findById(req.userId).select("-password").lean()
            // eslint-disable-next-line no-underscore-dangle
            if (user.favourites.indexOf(article._id) !== -1) {
                favourite = true
            }
        }

        article.comments = article.comments.map((comment) => {
            const newComment = { ...comment }
            newComment.date = comment.date
                .toLocaleString("en-GB")
                .split(",")[0]
                .replace(/\//g, ".")
            return newComment
        })
        const [shownPhotos, hiddenPhotos] = await getPhotosList()
        return res.render("topic", {
            layout: false,
            favourite,
            isLoggedIn: req.isLoggedIn,
            isAdmin: req.authorities?.admin,
            user,
            article,
            userId: req.userId,
            shownPhotos,
            hiddenPhotos,
        })
    } catch (e) {
        return res.status(500).end()
    }
}

exports.article_create_get = (req, res) => {
    if (!req.authorities?.admin) return res.redirect("/")
    let { context } = req.cookies
    res.clearCookie("context", { httpOnly: true })
    if (!context) context = {}

    return res.render("article_create_edit", {
        layout: false,
        page_title: "Новая статья",
        page_action: "/articles/add",
        article: context,
    })
}

exports.article_create_post = (req, res) => {
    req.article = new Article()
    util.saveArticleAndRedirect(req, res, req.headers.referer)
}

exports.comment_add = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
        const comment = {
            user: req.userId,
            text: req.body.text,
        }
        article.comments.unshift(comment)
        await article.save()
        return res.redirect(req.headers.referer)
    } catch (e) {
        return res.status(500).send("Ошибка сервера")
    }
}

exports.article_edit_get = async (req, res) => {
    if (!req.authorities?.admin) return res.redirect("/")
    const article = await Article.findById(req.params.id).lean()
    const { context } = req.cookies
    res.clearCookie("context", { httpOnly: true })

    return res.render("article_create_edit", {
        layout: false,
        page_title: "Редактировать статью",
        page_action: `/articles/${req.params.id}?_method=PUT`,
        article: context || article,
    })
}

exports.article_edit_put = async (req, res) => {
    req.article = await Article.findById(req.params.id)
    util.saveArticleAndRedirect(req, res, req.headers.referer)
}

exports.article_remove = async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect("/articles/category/all")
}
