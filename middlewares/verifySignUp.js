const db = require("../models")

const User = db.user

const handleError = (res, errorName) => {
    res.cookie("murzatay-error", errorName)
        .cookie("call-signup", true)
        .redirect("back")
}

exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const userByUsername = User.findOne({
            username: req.body.username,
        })
        if (userByUsername) {
            return handleError(res, "Имя пользователя занято")
        }

        const userByEmail = User.findOne({
            email: req.body.email,
        })
        if (userByEmail) {
            return handleError(res, "Email занят другим пользователем")
        }
        return next()
    } catch (e) {
        return handleError(
            res,
            "Произошла какая-то ошибка, попробуйте еще раз позднее"
        )
    }
}
