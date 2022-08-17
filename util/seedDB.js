const bcrypt = require("bcryptjs")
const Rubric = require("../models/rubric.model")
const Landing = require("../models/landing.model")
const { RUBRICS } = require("../constants")
const db = require("../models")
require("dotenv").config()

const User = db.user

exports.seedDB = async () => {
    const username = process.env.DB_ADMIN_USERNAME
    const password = process.env.DB_ADMIN_PASSWORD
    const email = process.env.DB_ADMIN_EMAIL

    RUBRICS.forEach(async (rubricName) => {
        const rubric = await Rubric.find({ name: rubricName })
        if (rubric.length === 0) {
            await new Rubric({ name: rubricName }).save()
        }
    })

    const admin = await User.findOne({ username, email })
    if (!admin) {
        User.create({
            role: "admin",
            username,
            email,
            password: bcrypt.hashSync(password, 8),
            active: true,
        })
    }

    const aboutLanding = await Landing.findOne({ path: "/about/edit" })
    if (!aboutLanding) {
        await Landing.create({
            markdown: "hello world",
            sanitizedHTML: "hello world",
            path: "/about/edit",
        })
    }

    const indexLanding = await Landing.findOne({ path: "/index/edit" })
    if (!indexLanding) {
        await Landing.create({
            markdown: "hello world",
            sanitizedHTML: "hello world",
            path: "/index/edit",
        })
    }
}
