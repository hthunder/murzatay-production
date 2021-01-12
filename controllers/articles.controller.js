const Article = require('../models/article.model');
const Rubric = require('../models/rubric.model');

// exports.articles_list = async (req, res) => {
//   res.redirect('/articles/category/all/page/1');
//   return;
// };

// exports.articles_pagination = async (req, res) => {
//   const page = req.params.page;
//   const size = 1;
//   if (page < 0 || page === 0) {
//     res.redirect('/articles/page/1');
//   }
//   const skip = size * (page - 1);
//   const articles = await Article.find()
//     .sort('-createdAt')
//     .skip(skip)
//     .limit(size)
//     .lean();
//   res.render('articles', { layout: false, articles: articles });
// };

exports.article_category = async (req, res) => {
  res.redirect(`/articles/category/${req.params.category}/page/1`);
  return;
};

// const verifyToken = (req, res, next) => {
//   // let token = req.headers['x-access-token'];
//   const token = req.cookies.token;

//   if (!token) {
//     return res.redirect('/');
//     // return res.status(403).send({ message: 'No token provided!' });
//   }

//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: 'Unauthorized' });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

exports.articles_category_pagination = async (req, res) => {
  // const token = req.cookies.token;
  // if (token) {
  //   jwt.verify(token, config.secret, (err, decoded) => {
  //     if (err) {
  //       return res.status(401).send({ message: 'Unauthorized' });
  //     }
  //     req.userId = decoded.id;
  //     next();
  //   });
  // }

  try {
    const page = req.params.page;
    const size = 2;
    if (page < 0 || page == 0) {
      res.redirect(`/articles/category/${req.params.category}/page/1`);
      return;
    }
    const skip = size * (page - 1);
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
      case 'all':
        category = 'all';
        break;
      default:
        res.redirect('/articles/category/all');
        return;
    }
    let rubric;
    let articles;
    let numberOfArticles;
    if (category != 'all') {
      rubric = await Rubric.findOne({ name: category });
      articles = await Article.find({ rubric })
        .sort('-createdAt')
        .skip(skip)
        .limit(size)
        .lean();
      numberOfArticles = await Article.countDocuments({ rubric });
    } else {
      articles = await Article.find()
        .sort('-createdAt')
        .skip(skip)
        .limit(size)
        .lean();
      numberOfArticles = await Article.countDocuments();
    }

    const last = Math.ceil(numberOfArticles / size);
    const pages = [];
    const pagesBefore = [];
    const pagesAfter = [];
    let index = 2;
    while (index < last) {
      pages.push(index);
      index++;
    }
    index = 2;
    while (index < page) {
      pagesBefore.push(index);
      index++;
    }

    index = +page + 1;
    while (index < last) {
      pagesAfter.push(index);
      index++;
    }
    res.render('articles', {
      layout: false,
      articles,
      page,
      category: req.params.category,
      notIsFirst: page == 1 ? false : true,
      notIsLast: page == last ? false : true,
      pagesBefore,
      pagesAfter,
      last,
      isAdmin: req.isAdmin,
      isLoggedIn: req.isLoggedIn
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
  res.redirect('/articles/category/all');
};
