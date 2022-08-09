const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")
const User = require("../models/user.model")
const { mailService } = require("../util/mailService")
const { CLIENT_500_ERROR } = require("../constants")

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

        if (user && !user.active) {
            const hash = user.activationHash
            const { email } = user
            const userMessage =
                "Пользователь не активирован, пройдите по ссылке в почте"
            const protocol = { req }
            if (email && hash) {
                mailService(
                    email,
                    "Подтверждение регистрации на сайте",
                    `${protocol}://${req.get("host")}/auth/activation?h=${hash}`
                )
            }
            return res.status(400).json({ errors: [userMessage] })
            // return res.cookie("murzatayWarning", userMessage).redirect("back")
        }

        req.user = user
        return next()
    } catch (e) {
        return res.status(500).json({ errors: [CLIENT_500_ERROR] })
        // return res.cookie("murzatayError", CLIENT_500_ERROR).redirect("back")
    }
}

const authJwt = {
    isLoggedIn,
    isAdmin,
    isActivated,
}

module.exports = authJwt
