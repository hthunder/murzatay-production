const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const config = require("../config/auth.config")
const db = require("../models")

const User = db.user
const Role = db.role

exports.signup = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    let user = new User({
        username: req.body.username,
        email: req.body.email,
        city: req.body.city,
        password: bcrypt.hashSync(req.body.password1, 8),
    })
    try {
        user = await user.save()

        if (req.body.roles) {
            const roles = await Role.find({
                name: { $in: req.body.roles },
            })

            // eslint-disable-next-line no-underscore-dangle
            user.roles = roles.map((role) => role._id)

            await user.save()
            return res.send({
                message: "User was registered successfully!",
            })
        }
        const role = await Role.findOne({ name: "user" })

        // eslint-disable-next-line no-underscore-dangle
        user.roles = [role._id]
        await user.save()
        return res
            .cookie("murzatay-message", "Вы успешно зарегистрированы")
            .redirect("back")
    } catch (e) {
        return res
            .cookie("murzatay-error", userError)
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
            .populate("roles", "-__v")
            .exec()

        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            userError = "Пользователь с такими данными не найден."
            throw new Error()
        }

        const authorities = {}
        for (let i = 0; i < user.roles.length; i += 1) {
            authorities[user.roles[i].name] = true
        }

        const token = jwt.sign({ id: user.id, authorities }, config.secret, {
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
