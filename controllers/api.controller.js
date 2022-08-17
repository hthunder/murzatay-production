const Article = require("../models/article.model")

exports.image_post = async (req, res) => {
    const location = req.file.path.substring("public".length)
    return res.json({ location: `/static${location}` })
}
