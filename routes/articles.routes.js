const express = require('express');
const Article = require('../models/article.model');
const router = express.Router();

router.get('/', async (req, res) => {
  const articles = await Article.find().lean();
  res.render('articles', { layout: false, articles: articles });
});

router.get('/:slug', (req, res) => {
  Article.findOne({ slug: req.params.slug }, (err, article) => {
    if (article == null) res.redirect('/');
    res.render('topic', {
      layout: false,
      title: article.title,
      sanitizedHTML: article.sanitizedHTML,
      id: article.id
    });
  });
});

router.get('/add', (req, res) => {
  res.render('articlesNew', {
    layout: false,
    article: new Article()
  });
});

router.get('/:id/edit', async (req, res) => {
  const article = await Article.findById(req.params.id).lean();
  res.render('articlesEdit', {
    layout: false,
    article: article,
    id: req.params.id
  });
});

router.put(
  '/:id',
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect('Edit')
);

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/articles');
});

router.post(
  '/new',
  (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect('New')
);

function saveArticleAndRedirect(path) {
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
}

module.exports = router;
