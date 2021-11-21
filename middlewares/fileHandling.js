const multer = require("multer")
const { ARTICLE_PREVIEW_SIZE_KB } = require("../constants")

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, `${process.cwd()}/public/img/previews`)
    },
    filename(_req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.jpeg`)
    },
})

const upload = multer({
    storage,
    limits: { fileSize: 1024 * ARTICLE_PREVIEW_SIZE_KB },
}).single("img")

module.exports = (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res
                .cookie(
                    "context",
                    {
                        ...req.body,
                        errors: "Слишком большой размер изображения.",
                    },
                    { httpOnly: true }
                )
                .redirect(req.headers.referer)
        }
        return next()
    })
}
