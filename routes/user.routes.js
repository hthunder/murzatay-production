const express = require("express")
const multer = require("multer")
const User = require("../models/user.model")

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/avatars")
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1]
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
    },
})

const multerFilter = (req, file, cb) => {
    const ext = file.mimetype.split("/")[1]
    if (ext === "jpg" || ext === "jpeg" || ext === "png") {
        cb(null, true)
    } else {
        cb(new Error("Не подходящее расширение файла"), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

const router = express.Router()

router.put(
    "/:id",
    upload.single("avatar"),
    (err, req, res, next) => {
        next(err)
        // разобраться, что будет если возникнет ошибка валидации типа загружаемого файла
        // console.error(err.stack)
        // res.status(500).send("Something broke!")
    },
    async (req, res) => {
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
            if (req.file)
                user.avatar = `/${req.file.path.split("public/")[1]}`
            // Добавить удаление старого аватара после успешного добавления нового аватара
            if (user.username !== req.body.username) {
                const count = await User.countDocuments({
                    username: req.body.username,
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
            console.log(e)
            return res.sendStatus(500)
        }
    }
)

module.exports = router
