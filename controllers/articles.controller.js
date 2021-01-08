const Article = require('../models/article.model');
const Rubric = require('../models/rubric.model');

exports.articles_list = async (req, res) => {
  const articles = await Article.find().sort('-createdAt').lean();
  res.render('articles', { layout: false, articles: articles });
};

exports.article_category = async (req, res) => {
  try {
    let category;
    switch (req.params.category) {
      case 'kormlenie':
        category = 'Кормление';
        break;
      case 'uhod':
        category = 'Уход';
        break;
      case 'vospitanie':
        category = 'Воспитание';
        break;
      case 'adaptaciya':
        category = 'Адаптация';
        break;
      case 'pora-k-veterinaru':
        category = 'Пора к ветеринару?';
        break;
      case 'koty-donory':
        category = 'Коты доноры';
        break;
      case 'koty-spinalniki':
        category = 'Коты спинальники';
        break;
      case 'interesnye-fakty':
        category = 'Интересные факты';
        break;
      case 'zabavnye-istorii':
        category = 'Забавные истории';
        break;
      default:
        res.redirect('/articles');
        return;
    }
    const rubric = await Rubric.findOne({ name: category });
    const articles = await Article.find({ rubric }).lean();
    res.render('articles', {
      layout: false,
      articles
    });
  } catch (err) {
    console.log(err);
  }
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
