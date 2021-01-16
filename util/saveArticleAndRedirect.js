const Rubric = require('../models/rubric.model');

exports.saveArticleAndRedirect = function (path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.markdown = req.body.markdown;
    article.description = req.body.description;
    if (req.hasOwnProperty('file'))
      article.img = `/uploads/${req.file.filename}`;

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
        console.log(err);
        const article_copy = {
          title: article.title,
          markdown: article.markdown,
          description: article.description
        };
        res.render(`articles${path}`, {
          layout: false,
          article: article_copy
        });
      });
  };
};
