const express = require("express")

const router = express.Router()
const controller = require("../controllers/articles.controller")
const fileHandling = require("../middlewares/fileHandling")
const { isAdmin } = require("../middlewares/authJwt")

// only for admins
router.get("/add", controller.article_create_get)

// only for admins
router.get("/:id/edit", controller.article_edit_get)

router.get("/:slug", controller.article_page)

router.put("/:id", fileHandling, controller.article_edit_put)

// router.delete("/:id", isAdmin, controller.article_remove)

router.post("/add", fileHandling, controller.article_create_post)

router.get("/", controller.article_list)
module.exports = router
