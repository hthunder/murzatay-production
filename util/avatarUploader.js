const multer = require("multer")

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

exports.avatarUploader = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})
