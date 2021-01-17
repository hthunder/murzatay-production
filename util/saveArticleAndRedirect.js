const Rubric = require('../models/rubric.model');

exports.saveArticleAndRedirect = function () {
  return async (req, res) => {
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
        console.log(err);
        const article_copy = {
          title: article.title,
          markdown: article.markdown,
          description: article.description
        };
        if (req.originalUrl == '/articles/add') {
          res.render(`article_create_edit`, {
            layout: false,
            page_title: 'Новая статья',
            page_action: '/articles/add',
            article: article_copy
          });
        } else {
          res.render(`article_create_edit`, {
            layout: false,
            page_title: 'Редактировать статью',
            page_action: `/articles/${req.params.id}?_method=PUT`,
            article: article_copy
          });
        }
      });
  };
};
