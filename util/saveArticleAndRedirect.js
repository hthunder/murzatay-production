exports.saveArticleAndRedirect = function (path) {
  return (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.markdown = req.body.markdown;
    article.description = req.body.description;
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
        res.render(`articles${path}`, {
          layout: false,
          article: article_copy
        });
      });
  };
};
