const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const {
    authErrorHandler,
    concatErrors,
    mailService,
    createHash,
} = require("../util")
const config = require("../config/auth.config")
const db = require("../models")

const User = db.user

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req)
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
            `https://3000-copper-hornet-8j3vlene.ws-eu11.gitpod.io/auth/activation?h=${user.activationHash}`
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

exports.logout = (_req, res) => res.clearCookie("token").redirect("/")
