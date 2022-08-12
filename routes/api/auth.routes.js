const express = require("express")
const validators = require("../../middlewares/validators")
const { isActivated } = require("../../middlewares/authJwt")
require("dotenv").config()
const authController = require("../../controllers/api/auth/auth.controller")

const authRouter = express.Router()

authRouter.post("/signin", isActivated, authController.signin_post)

authRouter.post("/signup", validators.signup, authController.signup_post)

authRouter.post("/forgot-pass", authController.forgot_pass_post)

authRouter.post("/password-reset", authController.reset_pass_post)

module.exports = authRouter
