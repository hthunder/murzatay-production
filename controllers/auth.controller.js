const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const { mailService } = require("../util")
const db = require("../models")
const Token = require("../models/token.model")
const {
    CLIENT_500_ERROR,
    NON_EXISTENT_CLIENT,
    PASSWORD_RESET_LINK_SENT,
    PASSWORD_MISMATCH,
    EXPIRED_PASSWORD_RESET_LINK,
} = require("../constants")

const User = db.user

exports.activation = async (req, res) => {
    try {
        const { h } = req.query
        await User.findOneAndUpdate({ activationHash: h }, { active: true })
        return res.redirect("/?success=Активация прошла успешно")
    } catch (e) {
        return res.cookie("murzatayError", CLIENT_500_ERROR).redirect("/")
    }
}

exports.forgot_pass_post = async (req, res) => {
    try {
        const { protocol } = req
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res
                .cookie("murzatayError", NON_EXISTENT_CLIENT)
                .redirect("back")
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

        const link = `${protocol}://${req.get(
            "host"
        )}/auth/password-reset?token=${resetToken}&id=${user._id}`
        mailService(user.email, "Ссылка для восстановления пароля", link)

        return res
            .cookie("murzatayMessage", PASSWORD_RESET_LINK_SENT)
            .redirect("/")
    } catch (e) {
        return res.cookie("murzatayError", CLIENT_500_ERROR).redirect("back")
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

exports.reset_pass_post = async (req, res) => {
    try {
        const { pass1, pass2, token, userId } = req.body
        if (pass1 !== pass2) {
            return res
                .cookie("murzatayError", PASSWORD_MISMATCH)
                .redirect("back")
        }

        if (!token) {
            return res
                .cookie("murzatayError", EXPIRED_PASSWORD_RESET_LINK)
                .redirect("back")
        }

        const bdToken = await Token.findOne({ userId })
        const isValidToken = await bcrypt.compare(token, bdToken.token)
        if (bdToken && !isValidToken) {
            return res
                .cookie("murzatayError", EXPIRED_PASSWORD_RESET_LINK)
                .redirect("back")
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
            .cookie("murzatayMessage", "Пароль успешно сброшен")
            .redirect("/")
    } catch (e) {
        return res.cookie("murzatayError", CLIENT_500_ERROR).redirect("back")
    }
}

exports.logout = (_req, res) => res.clearCookie("token").redirect("/")
