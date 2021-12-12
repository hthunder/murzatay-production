const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")
const User = require("../models/user.model")
const { mailService } = require("../util/mailService")

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
            req.userRole = decoded.role
        }
    })
    return next()
}

const isAdmin = (req, res, next) => {
    if (req.userRole === "admin") {
        return next()
    }
    return res.redirect("/")
}

const isActivated = async (req, res, next) => {
    try {
        const user = await User.findOne({
            $or: [
                { email: req.body.username },
                { username: req.body.username },
            ],
        })

        if (!user || user.active) return next()
        const error = new Error()
        error.hash = user.activationHash
        error.email = user.email
        error.userMessage =
            "Пользователь не активирован, пройдите по ссылке в почте"
        throw error
    } catch (e) {
        const protocol = { req }
        if (e.email && e.hash) {
            mailService(
                e.email,
                "Подтверждение регистрации на сайте",
                `${protocol}://${req.get("host")}/auth/activation?h=${e.hash}`
            )
        }
        return res.cookie("murzatay-error", e.userMessage).redirect("/")
    }
}

const authJwt = {
    isLoggedIn,
    isAdmin,
    isActivated,
}

module.exports = authJwt
