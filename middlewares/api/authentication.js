const jwt = require("jsonwebtoken")
const config = require("../../config/auth.config")
const { HttpError } = require("../../util/HttpError")

const authenticate = async (req, res, next) => {
    try {
        const { token } = req.cookies

        return jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                throw new HttpError("Вы не залогинены", 401)
            }
            req.userId = decoded.id
            req.userRole = decoded.role
            return next()
        })
    } catch (e) {
        return next(e)
    }
}

// "user", "moderator", "admin", "owner", or [] for authenticated users
const authorize = (roles = []) => {
    if (typeof roles === "string") {
        // eslint-disable-next-line no-param-reassign
        roles = [roles]
    }

    return [
        authenticate,
        (req, res, next) => {
            if (roles.includes("owner") && req.userId === req.params.id) {
                return next()
            }
            if (roles.length && !roles.includes(req.userRole)) {
                throw new HttpError(
                    "Вы не имеете права на данное действие",
                    403
                )
            }
            return next()
        },
    ]
}

module.exports = {
    authenticate,
    authorize,
}
