const createError = require("http-errors")
const Article = require("../../models/article.model")

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

module.exports = {
    articleRemove,
}
