const createError = require("http-errors")
const Article = require("../models/article.model")
const rubricService = require("./rubric.service")

const getArticleComments = async (id) => {
    const { comments } = await Article.findById(id, "comments")
        .populate({
            path: "comments",
            options: { sort: { date: -1 } },
            populate: {
                path: "user",
                select: "username avatar",
            },
        })
        .lean()
    return comments
}

const getArticle = async (id, slugSearch) => {
    const searchQuery = {}
    if (slugSearch && slugSearch === "true") {
        searchQuery.slug = id
    } else {
        searchQuery._id = id
    }
    const article = await Article.findOne(searchQuery).lean()
    if (!article) {
        throw createError(404, "The article does not exist")
    }
    return article
}

const getArticleCollection = async (props) => {
    const { rubric, q, limit, page, sortOrder } = props
    const searchRule = {}
    const options = {}

    if (rubric) {
        searchRule.rubric = rubric
    }
    if (q) {
        searchRule.title = { $regex: q, $options: "i" }
    }
    if (limit) {
        options.limit = parseInt(limit, 10)
    }
    if (limit && page) {
        options.skip = parseInt(limit, 10) * (page - 1)
    }
    if (sortOrder) {
        options.sort = { createdAt: sortOrder === "desc" ? -1 : 1 }
    }

    const articles = await Article.find(searchRule, null, options)
    return articles
}

const countArticles = async ({ rubricSlug, searchString }) => {
    const countRule = {}

    if (rubricSlug) {
        const id = await rubricService.slugToId(rubricSlug)
        countRule.rubric = id
    }
    if (searchString) {
        countRule.title = { $regex: searchString, $options: "i" }
    }
    const count = await Article.countDocuments(countRule)
    return count
}

module.exports = {
    getArticleComments,
    getArticle,
    getArticleCollection,
    countArticles,
}
