const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/', async (req, res) => {
	const articles = await Article.find().lean();
  res.render('articles', { layout: false, articles: articles });
});

router.get('/new', (req, res) => {
  res.render('articlesNew', { layout: false });
});

router.get('/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
		if (article == null) res.redirect('/');
    res.render('topic', {
      layout: false,
      title: article.title,
      description: article.description,
      markdown: article.markdown,
      id: req.params.id
    });
  });
});

router.post('/new', (req, res) => {
  const article = new Article({
    title: req.body.title,
    markdown: req.body.markdown,
    description: req.body.description
  });

  article
    .save()
    .then((article) => {
      res.redirect(`/articles/${article.id}`);
    })
    .catch((err) => {
      res.render('articlesNew', {
        layout: false,
        title: article.title,
        markdown: article.markdown,
        description: article.description
      });
    });
});

module.exports = router;
