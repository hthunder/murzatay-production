const { HttpError } = require("../../util/HttpError")

const authorizeOwner = (req, res, next) => {
    try {
        if (req.userId !== req.params.id) {
            throw new HttpError("Данное действие запрещено", 403)
        }
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = {
    authorizeOwner,
}
