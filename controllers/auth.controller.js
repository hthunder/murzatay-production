const db = require("../models")
const { CLIENT_500_ERROR } = require("../constants")
require("dotenv").config()

const User = db.user

exports.activation = async (req, res) => {
    try {
        const { h } = req.query
        await User.findOneAndUpdate({ activationHash: h }, { active: true })
        return res.redirect("/?success=Активация прошла успешно")
    } catch (e) {
        return res.redirect(`/?error=${CLIENT_500_ERROR}`)
    }
}

exports.reset_pass_get = async (req, res) => {
    try {
        const { token, id } = req.query

        return res.render("password_reset", {
            layout: false,
            userId: id,
            token,
        })
    } catch (e) {
        return res.redirect("/")
    }
}

exports.logout = (_req, res) => res.clearCookie("token").redirect("/")
