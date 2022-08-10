const User = require("../../models/user.model")
const { HttpError } = require("../../util/HttpError")

exports.logged_in_user_get = async (req, res, next) => {
    // console.log('dsadf')
    try {
        if (req.isLoggedIn) {
            const user = await User.findById(req.userId, {
                password: 0,
                __v: 0,
            }).lean()
            return res.status(200).json(user)
        }
        throw new HttpError("Пользователь на авторизован", 401)
    } catch (e) {
        return next(e)
    }
}

exports.user_get = async (req, res, next) => {
    try {
        const userId = req.params.id
        const user = await User.findById(
            userId,
            "about avatar city username"
        ).lean()
        if (!user) {
            throw new HttpError("Пользователь с таким id не существует", 404)
        }

        return res.status(200).json(user)
    } catch (e) {
        return next(e)
    }
}

const getFavouritesInfo = async (userId, articleId) => {
    const { favourites } = await User.findById(userId)
    const index = favourites.indexOf(articleId)
    if (index === -1) {
        favourites.push(articleId)
    } else {
        favourites.splice(index, 1)
    }
    return favourites
}

exports.user_patch = async (req, res, next) => {
    try {
        const userId = req.params.id
        const userData = req.body

        if (req.file) userData.avatar = `/${req.file.path.split("public/")[1]}`
        if (userData.favourites) {
            userData.favourites = await getFavouritesInfo(
                userId,
                userData.favourites
            )
        }

        const user = await User.findByIdAndUpdate(userId, userData, {
            new: true,
            fields: "about avatar city username favourites",
        }).lean()

        if (!user) {
            throw new HttpError("Пользователь с таким id не существует", 404)
        }

        return res.status(200).json(user)
    } catch (e) {
        return next(e)
    }
}

exports.user_favourite_put = async (req, res, next) => {
    try {
        if (req.isLoggedIn) {
            const { userId } = req
            const { articleId } = req.params

            const user = await User.findById(userId)
            if (!user.favourites.includes(articleId)) {
                user.favourites.push(articleId)
                user.save()
            }

            return res.sendStatus(204)
        }
        throw new HttpError("Пользователь на авторизован", 401)
    } catch (e) {
        return next(e)
    }
}

exports.user_favourite_delete = async (req, res, next) => {
    try {
        if (req.isLoggedIn) {
            const { userId } = req
            const { articleId } = req.params

            const user = await User.findById(userId)
            user.favourites = user.favourites.filter(
                (favouriteId) => articleId !== favouriteId.toString()
            )
            user.save()
            return res.sendStatus(204)
        }
        throw new HttpError("Пользователь на авторизован", 401)
    } catch (e) {
        return next(e)
    }
}
