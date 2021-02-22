// const { ObjectId } = require("mongoose").Types
const Article = require("../models/article.model")
const Rubric = require("../models/rubric.model")
const User = require("../models/user.model")
const util = require("../util/saveArticleAndRedirect")

exports.article_list = async (req, res) => {
    try {
        const limit = 1
        const { page = 1, category = "all" } = req.query

        if (page < 0 || page === 0) {
            res.redirect(`/articles`)
            return
        }

        const skip = limit * (page - 1)

        let articles
        let numberOfArticles = 0
        if (category === "all") {
            articles = await Article.find()
                .sort("-createdAt")
                .skip(skip)
                .limit(limit)
                .lean()
            numberOfArticles = await Article.countDocuments()
        } else {
            const rubric = await Rubric.findOne({ slug: category })
            if (rubric) {
                // eslint-disable-next-line no-underscore-dangle
                articles = await Article.find({ rubric: rubric._id })
                    .sort("-createdAt")
                    .skip(skip)
                    .limit(limit)
                    .lean()
                numberOfArticles = await Article.countDocuments({
                    // eslint-disable-next-line no-underscore-dangle
                    rubric: rubric._id
                })
            } else {
                // eslint-disable-next-line consistent-return
                return res.redirect(`/articles`)
            }
        }

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

        res.render("articles", {
            layout: false,
            rangeBefore,
            rangeAfter,
            first,
            last,
            current,
            articles,
            category,
            pointsBefore: first && rangeBegin > first + 1,
            pointsAfter: last && rangeEnd < last - 1,
            isAdmin: req.isAdmin,
            isLoggedIn: req.isLoggedIn
        })
    } catch (e) {
        console.log(e)
    }
}

exports.articles_search = async (req, res) => {
    const searchRule = req.query?.text
    try {
        const articles = await Article.find({
            title: { $regex: searchRule, $options: "i" }
        }).lean()
        res.render("articles", {
            layout: false,
            articles
        })
    } catch (e) {
        res.status(500).end()
    }
}

exports.article_page = async (req, res) => {
    try {
        let favourite = false
        const article = await Article.findOne({ slug: req.params.slug }).lean()
        if (article == null) res.redirect("/")

        if (req.isLoggedIn) {
            const user = await User.findById(req.userId)
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
            return comment
        })

        return res.render("topic", {
            layout: false,
            favourite,
            isLoggedIn: req.isLoggedIn,
            article,
            userId: req.userId
        })
    } catch (e) {
        return res.status(500).end()
    }
}

exports.article_create_get = (req, res) => {
    let { context } = req.cookies
    res.clearCookie("context", { httpOnly: true })
    if (!context) context = {}

    res.render("article_create_edit", {
        layout: false,
        page_title: "Новая статья",
        page_action: "/articles/add",
        article: context
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
            text: req.body.text
        }
        article.comments.unshift(comment)
        await article.save()
        return res.redirect(req.headers.referer)
    } catch (e) {
        return res.status(500).send("Ошибка сервера")
    }
}

exports.article_edit_get = async (req, res) => {
    const article = await Article.findById(req.params.id).lean()
    const { context } = req.cookies
    res.clearCookie("context", { httpOnly: true })

    res.render("article_create_edit", {
        layout: false,
        page_title: "Редактировать статью",
        page_action: `/articles/${req.params.id}?_method=PUT`,
        article: context || article
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
