// const { ObjectId } = require("mongoose").Types
const Article = require("../models/article.model")
const Rubric = require("../models/rubric.model")
const User = require("../models/user.model")
const util = require("../util/saveArticleAndRedirect")

exports.article_list = async (req, res) => {
    console.log("article_list")
    try {
        const limit = 2
        const { page = 1, category = "all" } = req.query

        if (page < 0 || page === 0) {
            res.redirect(`/articles`)
            return
        }

        const skip = limit * (page - 1)

        let articles
        if (category === "all") {
            articles = await Article.find()
                .sort("-createdAt")
                .skip(skip)
                .limit(limit)
                .lean()
        } else {
            const rubric = await Rubric.findOne({ slug: category })
            if (rubric) {
                // eslint-disable-next-line no-underscore-dangle
                articles = await Article.find({ rubric: rubric._id })
                    .sort("-createdAt")
                    .skip(skip)
                    .limit(limit)
                    .lean()
            } else {
                return res.redirect(`/articles`)
            }
        }

        console.log(articles)
        const numberOfArticles = articles.length

        const last = Math.ceil(numberOfArticles / limit)
        const pages = []
        const pagesBefore = []
        const pagesAfter = []
        let index = 2
        while (index < last) {
            pages.push(index)
            index += 1
        }
        index = 2
        while (index < page) {
            pagesBefore.push(index)
            index += 1
        }

        index = +page + 1
        while (index < last) {
            pagesAfter.push(index)
            index += 1
        }
        res.render("articles", {
            layout: false,
            articles,
            page,
            category: req.params.category,
            notIsFirst: page !== 1,
            notIsLast: page !== last,
            pagesBefore,
            pagesAfter,
            last,
            isAdmin: req.isAdmin,
            isLoggedIn: req.isLoggedIn
        })
    } catch (e) {
        console.log(e)
    }
}

exports.article_category = async (req, res) => {
    res.redirect(`/articles/category/${req.params.category}/page/1`)
}

exports.articles_category_pagination = async (req, res) => {
    try {
        const { page } = req.params
        const size = 2
        if (page < 0 || page === 0) {
            res.redirect(`/articles/category/${req.params.category}/page/1`)
            return
        }
        const skip = size * (page - 1)
        let category
        switch (req.params.category) {
            case "kormlenie":
                category = "Кормление"
                break
            case "uhod":
                category = "Уход"
                break
            case "vospitanie":
                category = "Воспитание"
                break
            case "adaptaciya":
                category = "Адаптация"
                break
            case "pora-k-veterinaru":
                category = "Пора к ветеринару?"
                break
            case "koty-donory":
                category = "Коты доноры"
                break
            case "koty-spinalniki":
                category = "Коты спинальники"
                break
            case "interesnye-fakty":
                category = "Интересные факты"
                break
            case "zabavnye-istorii":
                category = "Забавные истории"
                break
            case "all":
                category = "all"
                break
            default:
                res.redirect("/articles/category/all")
                return
        }
        let rubric
        let articles
        let numberOfArticles
        if (category !== "all") {
            rubric = await Rubric.findOne({ name: category })
            articles = await Article.find({ rubric })
                .sort("-createdAt")
                .skip(skip)
                .limit(size)
                .lean()
            numberOfArticles = await Article.countDocuments({ rubric })
        } else {
            articles = await Article.find()
                .sort("-createdAt")
                .skip(skip)
                .limit(size)
                .lean()
            numberOfArticles = await Article.countDocuments()
        }

        const last = Math.ceil(numberOfArticles / size)
        const pages = []
        const pagesBefore = []
        const pagesAfter = []
        let index = 2
        while (index < last) {
            pages.push(index)
            index += 1
        }
        index = 2
        while (index < page) {
            pagesBefore.push(index)
            index += 1
        }

        index = +page + 1
        while (index < last) {
            pagesAfter.push(index)
            index += 1
        }
        res.render("articles", {
            layout: false,
            articles,
            page,
            category: req.params.category,
            notIsFirst: page !== 1,
            notIsLast: page !== last,
            pagesBefore,
            pagesAfter,
            last,
            isAdmin: req.isAdmin,
            isLoggedIn: req.isLoggedIn
        })
    } catch (err) {
        res.status(500).end()
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
