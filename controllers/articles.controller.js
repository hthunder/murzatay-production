const Article = require('../models/article.model');

exports.articles_list = async (req, res) => {
  const articles = await Article.find().sort('-createdAt').lean();
  res.render('articles', { layout: false, articles: articles });
};

exports.article_page = (req, res) => {
  Article.findOne({ slug: req.params.slug }, (err, article) => {
    if (article == null) res.redirect('/');
    res.render('topic', {
      layout: false,
      title: article.title,
      sanitizedHTML: article.sanitizedHTML,
      id: article.id
    });
  });
};

exports.article_create_get = (req, res) => {
  res.render('articlesNew', {
    layout: false,
    article: new Article()
  });
};

exports.article_create_post = (req, res, next) => {
  req.article = new Article();
  next();
};

exports.article_edit_get = async (req, res) => {
  const article = await Article.findById(req.params.id).lean();
  res.render('articlesEdit', {
    layout: false,
    article: article,
    id: req.params.id
  });
};

exports.article_edit_put = async (req, res, next) => {
  req.article = await Article.findById(req.params.id);
  next();
};

exports.article_remove = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/articles');
};

// router.put(
//   '/:id',
//   async (req, res, next) => {
//     req.article = await Article.findById(req.params.id);
//     next();
//   },
//   saveArticleAndRedirect('Edit')
// );

// router.post(
//   '/new',
// (req, res, next) => {
//   req.article = new Article();
//   next();
// },
//   saveArticleAndRedirect('New')
// );
