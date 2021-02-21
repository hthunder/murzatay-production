const express = require("express")
const User = require("../models/user.model")

const router = express.Router()

router.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const errors = []

        if (req.userId !== userId) {
            return res.sendStatus(403)
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.sendStatus(404)
        }

        user.about = req.body.about
        user.city = req.body.city
        if (user.username !== req.body.username) {
            const count = await User.countDocuments({
                username: req.body.username
            })
            if (count === 0) {
                user.username = req.body.username
            } else {
                errors.push("Пользователь с таким именем уже существует")
                res.cookie("errors", errors, { httpOnly: true })
            }
        }
        await user.save()

        return res.redirect(req.headers.referer)
    } catch (e) {
        return res.sendStatus(500)
    }
})

module.exports = router
