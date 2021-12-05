const fs = require("fs")
const Landing = require("../models/landing.model")

const getHeading = (path) =>
    path === "/about/edit"
        ? "Редактирование страницы о себе"
        : "Редактирование главной страницы"

exports.landingGet = async (req, res) => {
    try {
        const { path } = req
        const landing = await Landing.findOne({
            path,
        }).lean()
        return res.render("landing-edit", {
            layout: false,
            sanitizedHTML: landing.sanitizedHTML,
            markdown: landing.markdown,
            heading: getHeading(path),
            path,
        })
    } catch (e) {
        return res.status(500).send()
    }
}

exports.landingPost = async (req, res) => {
    try {
        const { path } = req
        const generateUpdateObj = () => {
            const imgPath = req.file
                ? req.file.path.substr("public".length)
                : ""
            const updateObj = {
                markdown: req.body.markdown,
            }
            return req.file ? { ...updateObj, img: imgPath } : updateObj
        }

        const preUpdated = await Landing.findOneAndUpdate(
            {
                path,
            },
            generateUpdateObj()
        ).lean()
        if (req.file) {
            fs.unlink(`./public${preUpdated.img}`, () => {})
        }
        return res.redirect(path)
    } catch (e) {
        return res.status(500).send()
    }
}
