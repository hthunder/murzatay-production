const express = require("express")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const validators = require("../../../middlewares/validators")
const { CLIENT_500_ERROR } = require("../../../constants")
const { isActivated } = require("../../../middlewares/authJwt")
const User = require("../../../models/user.model")
const { createHash, mailService } = require("../../../util")
const { isUserNotExisted, isPasswordWrong, issueToken } = require("./util")
require("dotenv").config()

const authRouter = express.Router()

authRouter.post("/signin", isActivated, async (req, res) => {
    try {
        const { user } = req

        if (
            isUserNotExisted(user) ||
            isPasswordWrong(req.body.password, user.password)
        ) {
            return res
                .status(400)
                .json({ errors: ["Пользователь с такими данными не найден."] })
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
    } catch (e) {
        return res.status(500).json({
            errors: ["Произошла какая-то ошибка, попробуйте еще раз позднее"],
        })
    }
})

authRouter.post("/signup", validators.signup, async (req, res) => {
    try {
        const clientErrors = validationResult(req)
        if (!clientErrors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: clientErrors.errors.map((error) => error.msg) })
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
    } catch (e) {
        return res.status(500).json({ errors: [CLIENT_500_ERROR] })
    }
})

module.exports = authRouter
