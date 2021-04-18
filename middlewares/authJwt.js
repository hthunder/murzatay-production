const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")

const isLoggedIn = (req, _res, next) => {
    const { token } = req.cookies
    req.isLoggedIn = false

    if (!token) {
        return next()
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            req.isLoggedInErrors = []
            req.isLoggedInErrors.push("Bad token")
        } else {
            req.isLoggedIn = true
            req.userId = decoded.id
            req.authorities = decoded.authorities
        }
    })
    return next()
}

const isAdmin = (req, res, next) => {
    if (req.authorities?.admin) {
        return next()
    }
    return res.redirect("/")
}

const authJwt = {
    isLoggedIn,
    isAdmin,
}

module.exports = authJwt
