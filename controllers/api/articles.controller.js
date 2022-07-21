const Article = require("../../models/article.model")

const articleRemove = async (req, res, next) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id)

        if (!deletedArticle) {
            deletedArticle.comments.map(async (commentId) => {
                await Comment.findByIdAndDelete(commentId)
            })
        }

        res.sendStatus(200)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    articleRemove,
}
