const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const { validationResult } = require("express-validator")
const createError = require("http-errors")
const { mailService } = require("../../../util")
const db = require("../../../models")
const Token = require("../../../models/token.model")
const {
    CLIENT_500_ERROR,
    NON_EXISTENT_CLIENT,
    PASSWORD_RESET_LINK_SENT,
    PASSWORD_MISMATCH,
    EXPIRED_PASSWORD_RESET_LINK,
} = require("../../../constants")
const { createHash } = require("../../../util")
const { isUserNotExisted, isPasswordWrong, issueToken } = require("./util")
require("dotenv").config()

const User = db.user

exports.forgot_pass_post = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            const error = createError(404, "User is not existed")
            return next(error)
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

        const link = `${process.env.ORIGIN}/auth/password-reset?token=${resetToken}&id=${user._id}`
        mailService(user.email, "Ссылка для восстановления пароля", link)

        return res.json({ message: PASSWORD_RESET_LINK_SENT })
    } catch (error) {
        return next(createError(500, error))
    }
}

exports.signin_post = async (req, res, next) => {
    try {
        const { user } = req

        if (
            isUserNotExisted(user) ||
            isPasswordWrong(req.body.password, user.password)
        ) {
            const error = createError(404, "User is not existed")
            return next(error)
        }

        const { id, role } = user
        const token = issueToken({ id, role }, 86400)

        return res
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: true,
            })
            .status(200)
            .send()
    } catch (error) {
        return next(createError(500, error))
    }
}

exports.signup_post = async (req, res, next) => {
    try {
        const clientErrors = validationResult(req)
        if (!clientErrors.isEmpty()) {
            const error = createError(
                400,
                clientErrors.errors.reduce(
                    (acc, cur) => `${acc} ${cur.msg}\n`,
                    ""
                )
            )
            return next(error)
        }

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            city: req.body.city,
            password: bcrypt.hashSync(req.body.password, 8),
            activationHash: createHash(),
        })
        await user.save()

        mailService(
            user.email,
            "Подтверждение регистрации на сайте",
            `${process.env.ORIGIN}/auth/activation?h=${user.activationHash}`
        )

        return res.status(200).send()
    } catch (error) {
        return next(createError(500, error))
    }
}

exports.reset_pass_post = async (req, res, next) => {
    try {
        const { password, token, userId } = req.body

        if (!token || !userId || !password) {
            const error = createError(400, "Missing data")
            return next(error)
        }

        const bdToken = await Token.findOne({ userId })
        const isValidToken = await bcrypt.compare(token, bdToken.token)
        if (bdToken && !isValidToken) {
            const error = createError(400, "Password reset link expired")
            return next(error)
        }

        const hashedPass = bcrypt.hashSync(password, 8)
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { password: hashedPass }
        )
        if (!user) {
            const error = createError(404, "User is not found")
            return next(error)
        }

        await bdToken.deleteOne()

        return res.status(200).send()
    } catch (e) {
        return res.status(500).json({ errors: [CLIENT_500_ERROR] })
    }
}
