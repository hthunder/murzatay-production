const createError = require("http-errors")
const User = require("../../models/user.model")

exports.logged_in_user_get = async (req, res, next) => {
    try {
        if (req.isLoggedIn) {
            const user = await User.findById(req.userId, {
                password: 0,
                __v: 0,
            }).lean()
            return res.status(200).json(user)
        }
        const error = createError(401, "Unauthorized")
        return next(error)
    } catch (err) {
        return next(createError(500, err))
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
            const error = createError(404, "User is not existed")
            return next(error)
        }

        return res.status(200).json(user)
    } catch (err) {
        return next(createError(500, err))
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
            const error = createError(404, "User is not existed")
            return next(error)
        }

        return res.status(200).json(user)
    } catch (err) {
        return next(createError(500, err))
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
        const error = createError(401, "User is not authorized")
        return next(error)
    } catch (err) {
        return next(createError(500, err))
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
        const error = createError(401, "User is not authorized")
        return next(error)
    } catch (err) {
        return next(createError(500, err))
    }
}
