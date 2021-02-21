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
        password: bcrypt.hashSync(req.body.password1, 8)
    })

    try {
        user = await user.save()

        if (req.body.roles) {
            const roles = await Role.find({
                name: { $in: req.body.roles }
            })

            // eslint-disable-next-line no-underscore-dangle
            user.roles = roles.map((role) => role._id)

            await user.save()
            return res.send({
                message: "User was registered successfully!"
            })
        }
        const role = await Role.findOne({ name: "user" })

        // eslint-disable-next-line no-underscore-dangle
        user.roles = [role._id]
        await user.save()
        return res.send({ message: "User was registered successfully!" })
    } catch (e) {
        return res.status(500).send({ message: e })
    }
}

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne()
            .or([{ email: req.body.username }, { username: req.body.username }])
            .populate("roles", "-__v")
            .exec()

        if (!user) {
            return res.status(404).send({ message: "User not found." })
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password!"
            })
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        })

        const authorities = []

        for (let i = 0; i < user.roles.length; i += 1) {
            authorities.push(`ROLE_${user.roles[i].name.toUpperCase()}`)
        }

        res.cookie("token", token, { httpOnly: true })
        return res.redirect("/")
    } catch (e) {
        return res.status(500).send({ message: e })
    }
}

exports.logout = (req, res) => {
    res.clearCookie("token")
    res.redirect("/")
}
