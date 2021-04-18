const express = require("express")
const upload = require("../middlewares/articleImgHandler")
const { isAdmin } = require("../middlewares/authJwt")

const router = express.Router()
const User = require("../models/user.model")

router.put("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id
        let message = ""

        if (req.userId !== userId) {
            return res.status(403).json({ message: "This action is forbidden" })
        }

        const user = await User.findById(userId)
        const updates = req.body

        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" })
        }

        const resJSON = {}
        if (updates.favourites) {
            const index = user.favourites.indexOf(updates.favourites)
            if (index !== -1) {
                message = "Removed from favourites"
                user.favourites.splice(index, 1)
                resJSON.favourites = false
            } else {
                message = "Added to favourites"
                user.favourites.push(updates.favourites)
                resJSON.favourites = true
            }
        }

        const updatedUser = await user.save()
        resJSON.message = message
        resJSON.user = updatedUser
        return res.status(200).json(resJSON)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

// article images upload handler
// url: /api/images
// method: post
// admin route
// private

router.post("/images", isAdmin, upload.single("file"), async (req, res) => {
    const location = req.file.path.substring("public".length)
    return res.json({ location })
})

module.exports = router
