const createError = require("http-errors")

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (!err.statusCode) {
            return next(createError(500, err))
        }
        return next(err)
    })
}

module.exports = catchAsync
