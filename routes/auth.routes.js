const express = require("express")

const router = express.Router()
const checkHeaders = require("../middlewares/checkHeaders")
const { isActivated } = require("../middlewares/authJwt")
const controller = require("../controllers/auth.controller")
const validators = require("../middlewares/validators")

router.use(checkHeaders)
router.get("/activation", controller.activation)
router.post("/signup", validators.signup, controller.signup)
router.post("/signin", isActivated, controller.signin)
router.get("/logout", controller.logout)

module.exports = router
