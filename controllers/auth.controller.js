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
        res.redirect(req.headers.referer)
        // return res.send({ message: "User was registered successfully!" })
    } catch (e) {
        res.redirect(req.headers.referer)
        // return res.status(500).send({ message: e })
    }
}

// .exec() gives you better stack traces
exports.signin = async (req, res) => {
    try {
        const user = await User.findOne()
            .or([{ email: req.body.username }, { username: req.body.username }])
            .populate("roles", "-__v")
            .exec()

        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.redirect(req.headers.referer)
            // return res
            //     .status(401)
            //     .json({ error: "Пользователь с такими данным не найден." })
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
            .redirect(req.headers.referer)
        // return res.status(200).json({ redirectUrl: "/", redirected: true })
        // res.redirect(req.headers.referer)
    } catch (e) {
        // return res.status(500).json({ message: e })
        return res.redirect(req.headers.referer)
    }
}

exports.logout = (_req, res) => res.clearCookie("token").redirect("/")
