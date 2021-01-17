const Rubric = require('../models/rubric.model');

exports.saveArticleAndRedirect = async function (req, res, redirect) {
  let article = req.article;
  article.title = req.body.title;
  article.markdown = req.body.markdown;
  article.description = req.body.description;
  if (req.hasOwnProperty('file'))
    article.img = `/img/previews/${req.file.filename}`;

  const rubric = await Rubric.findOne({
    name: req.body.rubric
  });
  article.rubric = rubric._id;

  article
    .save()
    .then((article) => {
      res.redirect(`/articles/${article.slug}`);
    })
    .catch((err) => {
      const article_copy = {
        title: article.title,
        markdown: article.markdown,
        description: article.description
      };
      res
        .cookie('context', article_copy, { httpOnly: true })
        .redirect(redirect);
    });
};
