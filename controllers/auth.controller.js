const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const crypto = require("crypto")
const {
    authErrorHandler,
    concatErrors,
    mailService,
    createHash,
} = require("../util")
const config = require("../config/auth.config")
const db = require("../models")
const Token = require("../models/token.model")

const User = db.user

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req)
        const { protocol, hostname } = req
        if (!errors.isEmpty()) {
            return authErrorHandler(res, concatErrors(errors), "call-signup")
        }
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            city: req.body.city,
            password: bcrypt.hashSync(req.body.password1, 8),
            activationHash: createHash(),
        })
        await user.save()
        mailService(
            user.email,
            "Подтверждение регистрации на сайте",
            `${protocol}://${hostname}/auth/activation?h=${user.activationHash}`
        )
        return res
            .cookie(
                "murzatay-message",
                "Вы успешно зарегистрированы, на вашу почту отправлено письмо с ссылкой активации"
            )
            .redirect("back")
    } catch (e) {
        return authErrorHandler(
            res,
            "Произошла какая-то ошибка, попробуйте еще раз позднее",
            "call-signup"
        )
    }
}

exports.activation = async (req, res) => {
    try {
        const { h } = req.query
        await User.findOneAndUpdate({ activationHash: h }, { active: true })
        return res.redirect("/")
    } catch (e) {
        return res
            .cookie(
                "murzatay-error",
                "Во время активации произошла какая-то ошибка, попробуйте позднее"
            )
            .redirect("/")
    }
}

exports.signin = async (req, res) => {
    let userError = "Произошла какая-то ошибка, попробуйте еще раз позднее"
    try {
        const user = await User.findOne()
            .or([{ email: req.body.username }, { username: req.body.username }])
            .exec()

        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            userError = "Пользователь с такими данными не найден."
            throw new Error()
        }

        const { id, role } = user
        const token = jwt.sign({ id, role }, config.secret, {
            expiresIn: 86400,
        })
        return res
            .cookie("token", token, { httpOnly: true, sameSite: "lax" })
            .redirect("back")
    } catch (e) {
        return authErrorHandler(res, userError, "call-login")
    }
}

exports.forgot_pass_get = async (req, res) => {
    res.render("forgot_pass", {
        layout: false,
    })
}

exports.forgot_pass_post = async (req, res) => {
    let userError = "Произошла какая-то ошибка, попробуйте еще раз позднее"
    try {
        const { protocol, hostname } = req
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            userError = "Пользователя с таким email-ом не существует"
            throw new Error()
        }
        await Token.findOneAndDelete({ userId: user._id })
        const resetToken = crypto.randomBytes(32).toString("hex")
        const hash = await bcrypt.hash(
            resetToken,
            Number(process.env.BCRYPT_SALT)
        )

        await new Token({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        }).save()

        const link = `${protocol}://${hostname}/auth/password-reset?token=${resetToken}&id=${user._id}`
        mailService(user.email, "Ссылка для восстановления пароля", link)
        return res
            .cookie(
                "murzatay-message",
                "Вам на почту направлено письмо с ссылкой для восстановления пароля"
            )
            .redirect("/")
    } catch (e) {
        return res.cookie("murzatay-error", userError).redirect("back")
    }
}

exports.reset_pass_get = async (req, res) => {
    try {
        const { token, id } = req.query
        res.render("password_reset", {
            layout: false,
            userId: id,
            token,
        })
    } catch (e) {
        return res.redirect("/")
    }
}

exports.reset_pass_post = async (req, res) => {
    let userError = "Произошла какая-то ошибка, попробуйте еще раз позднее"
    try {
        const { pass1, pass2, token, userId } = req.body
        if (pass1 !== pass2) {
            userError = "Пароли не совпадают"
            throw new Error()
        }
        if (!token) {
            userError =
                "Ссылка для восстановления пароля истекла, запросите новую"
            throw new Error()
        }
        const bdToken = await Token.findOne({ userId })
        const isValidToken = await bcrypt.compare(token, bdToken.token)
        if (bdToken && !isValidToken) {
            userError =
                "Ссылка для восстановления пароля истекла, запросите новую"
            throw new Error()
        }
        const hashedPass = bcrypt.hashSync(pass1, 8)
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { password: hashedPass }
        )
        if (!user) {
            throw new Error()
        }
        await bdToken.deleteOne()
        return res
            .cookie("murzatay-message", "Пароль успешно сброшен")
            .redirect("/")
    } catch (e) {
        return res.cookie("murzatay-error", userError).redirect("back")
    }
}

exports.logout = (_req, res) => res.clearCookie("token").redirect("/")
