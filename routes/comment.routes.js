const { Router } = require("express")

const router = Router()
const controller = require("../controllers/comment.controller")

router.post("/", controller.comment_add)

module.exports = router
