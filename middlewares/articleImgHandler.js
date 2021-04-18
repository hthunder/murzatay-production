const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: `public/img/articles`,
    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

const upload = multer({ storage })

module.exports = upload
