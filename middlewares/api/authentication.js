const jwt = require("jsonwebtoken")
const config = require("../../config/auth.config")
const { HttpError } = require("../../util/HttpError")

const authentication = async (req, res, next) => {
    try {
        const { token } = req.cookies

        jwt.verify(token, config.secret, (err, decoded) => {
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

module.exports = {
    authentication,
}
