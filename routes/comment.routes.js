const { Router } = require("express")

const router = Router()
const controller = require("../controllers/comment.controller")

router.post("/", controller.comment_add)

router.post("/:commentId", controller.comment_delete)

module.exports = router
