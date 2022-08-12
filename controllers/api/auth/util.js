const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const config = require("../../../config/auth.config")

const isUserExisted = (user) => {
    return Boolean(user)
}

const isUserNotExisted = (user) => {
    return !isUserExisted(user)
}

const isPasswordCorrect = (s, hash) => {
    return bcrypt.compareSync(s, hash)
}

const isPasswordWrong = (s, hash) => {
    return !isPasswordCorrect(s, hash)
}

const issueToken = (payload, expiresIn) => {
    return jwt.sign(payload, config.secret, {
        expiresIn, // TODO make sure that users are not unlogged every day
    })
}

module.exports = {
    isUserExisted,
    isUserNotExisted,
    isPasswordCorrect,
    isPasswordWrong,
    issueToken,
}
