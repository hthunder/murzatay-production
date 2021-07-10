const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const config = require("../config/auth.config")
const db = require("../models")

const User = db.user

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res
                .cookie(
                    "murzatay-error",
                    errors
                        .array()
                        .map((error) => error.msg)
                        .join("\n")
                )
                .cookie("call-signup", true)
                .redirect("back")
        }
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            city: req.body.city,
            password: bcrypt.hashSync(req.body.password1, 8),
        })
        await user.save()

        return res
            .cookie("murzatay-message", "Вы успешно зарегистрированы")
            .redirect("back")
    } catch (e) {
        return res
            .cookie(
                "murzatay-error",
                "Произошла какая-то ошибка, попробуйте еще раз позднее"
            )
            .cookie("call-signup", true)
            .redirect("back")
    }
}

// .exec() gives you better stack traces
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
        return res
            .cookie("murzatay-error", userError)
            .cookie("call-login", true)
            .redirect("back")
    }
}

exports.logout = (_req, res) => res.clearCookie("token").redirect("/")
