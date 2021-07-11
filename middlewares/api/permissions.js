const { HttpError } = require("../../util/HttpError")
const Comment = require("../../models/comment.model")

exports.authorizeOwner = (req, res, next) => {
    try {
        if (req.userId !== req.params.id) {
            throw new HttpError("Данное действие запрещено", 403)
        }
        next()
    } catch (e) {
        next(e)
    }
}

exports.authCommentDelete = (authorizedRoles) => async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (
            authorizedRoles.includes(req.userRole) ||
            comment.user.toString() === req.userId
        ) {
            return next()
        }
        throw new HttpError(
            "У вас нет прав для совершения данного действия",
            403
        )
    } catch (e) {
        return next(e)
    }
}

exports.authCommentEdit = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (comment.user.toString() === req.userId) {
            return next()
        }
        throw new HttpError(
            "У вас нет прав для совершения данного действия",
            403
        )
    } catch (e) {
        return next(e)
    }
}

exports.authForRoles = (authorizedRoles) => (req, res, next) => {
    if (authorizedRoles.includes(req.userRole)) {
        return next()
    }
    return next(
        new HttpError("У вас нет прав для совершения данного действия", 403)
    )
}
