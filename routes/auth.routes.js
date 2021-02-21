const express = require("express")

const router = express.Router()
const checkHeaders = require("../middlewares/checkHeaders")
const controller = require("../controllers/auth.controller")
const validators = require("../middlewares/validators")

router.use(checkHeaders)
router.post("/signup", validators.signup, controller.signup)
router.post("/signin", controller.signin)
router.post("/logout", controller.logout)

module.exports = router
