const createError = require("http-errors")
const Comment = require("../models/comment.model")

const createComment = async (commentBody) => {
    const comment = await Comment.create(commentBody)
}

const deleteCommentById = async (commentId) => {
    const comment = await Comment.findByIdAndDelete(commentId)
    if (!comment) {
        throw createError(404, "Comment is not exist")
    }
}

module.exports = {
    deleteCommentById,
}
