const createError = require("http-errors")
const Article = require("../../models/article.model")
const articleService = require("../../services/articles.service")
const rubricService = require("../../services/rubric.service")
const catchAsync = require("../../util/catchAsync")

const articleRemove = async (req, res, next) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id)

        if (!deletedArticle) {
            deletedArticle.comments.map(async (commentId) => {
                await Comment.findByIdAndDelete(commentId)
            })
        }

        return res.sendStatus(200)
    } catch (err) {
        return next(createError(500, err))
    }
}

const isLoggedIn = (userId) => {
    return Boolean(userId)
}

const isCommentOwner = (commentUserId, requestUserId) => {
    return commentUserId.toString() === requestUserId.toString()
}

const isAdminOrModerator = (userRole) => {
    return ["admin", "moderator"].includes(userRole)
}

const articleCommentsGet = catchAsync(async (req, res, next) => {
    try {
        const { articleId } = req.params
        // const { userId, userRole } = req

        const comments = await articleService.getArticleComments(articleId)
        console.log(comments)
        // if (isLoggedIn(userId)) { // TODO make public api and make authorization on client
        //     const modifiedComments = comments.map((comment) => ({
        //         ...comment,
        //         isEditable: isCommentOwner(comment.user._id, userId),
        //         isDeletable:
        //             isCommentOwner(comment.user._id, userId) ||
        //             isAdminOrModerator(userRole),
        //     }))
        //     return res.status(200).json(modifiedComments)
        // }
        return res.status(200).json(comments)
    } catch (e) {
        return next(e)
    }
})

const articleGet = catchAsync(async (req, res, next) => {
    const { articleId } = req.params
    const { slugSearch } = req.query
    const article = await articleService.getArticle(articleId, slugSearch)
    return res.status(200).json(article)
})

const allArticlesGet = catchAsync(async (req, res, next) => {
    const { category, ...queryParams } = req.query
    if (category) {
        console.log("enter here", category)
        const rubricId = await rubricService.slugToId(category)
        queryParams.rubric = rubricId
    }
    const articles = await articleService.getArticleCollection(queryParams)
    return res.status(200).json(articles)
})

module.exports = {
    articleRemove,
    articleCommentsGet,
    articleGet,
    allArticlesGet,
}
