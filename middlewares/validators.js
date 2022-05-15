const { check, body } = require("express-validator")
const db = require("../models")

const User = db.user

exports.signup = [
    body("username", "Введите логин").not().isEmpty(),
    body("email", "Введите валидный email").isEmail().not().isEmpty(),
    body("password1").custom((value, { req }) => {
        if (value !== req.body.password2) {
            throw new Error("Пароли не совпадают")
        }
        return true
    }),
    body("password1", "Пароль должен содержать от 6 до 30 символов").isLength({
        min: 6,
        max: 30,
    }),
    body("username").custom(async (value) => {
        const userByUsername = await User.findOne({
            username: value,
        })
        if (userByUsername) {
            return Promise.reject("Имя пользователя занято")
        }
    }),
    body("email").custom(async (value) => {
        const userByEmail = await User.findOne({
            email: value,
        })
        if (userByEmail) {
            return Promise.reject("Email занят другим пользователем")
        }
    }),
]
