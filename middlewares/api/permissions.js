const { HttpError } = require("../../util/HttpError")

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

exports.authForRoles = (authorizedRoles) => (req, res, next) => {
    if (authorizedRoles.includes(req.userRole)) {
        return next()
    }
    return next(
        new HttpError("У вас нет прав для совершения данного действия", 403)
    )
}
