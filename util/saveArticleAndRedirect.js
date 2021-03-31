const Rubric = require("../models/rubric.model")

exports.saveArticleAndRedirect = async (req, res, redirect) => {
    let { article } = req
    console.log(req.body.markdown)
    article.title = req.body.title
    article.markdown = req.body.markdown
    article.description = req.body.description

    if (Object.prototype.hasOwnProperty.call(req, "file"))
        article.img = `/img/previews/${req.file.filename}`

    const rubric = await Rubric.findOne({
        name: req.body.rubric,
    })
    // eslint-disable-next-line no-underscore-dangle
    article.rubric = rubric._id

    try {
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch (e) {
        const articleCopy = {
            title: article.title,
            markdown: article.markdown,
            description: article.description,
        }
        res.cookie("context", articleCopy, { httpOnly: true }).redirect(
            redirect
        )
    }
}
