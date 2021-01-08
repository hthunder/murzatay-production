const { Router } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const router = Router();
const Article = require('../models/article.model');

router.get('/', async (req, res) => {
  // if ()
  // app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);
  const articles = await Article.find().sort('-createdAt').limit(2).lean();
  const token = req.cookies.token;
  let authorized = false;
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized' });
      }
      // req.userId = decoded.id;
      // next();
      authorized = true;
    });
  }
  if (authorized) {
    res.render('index', {
      layout: false,
      authorized: true,
      articles: articles
    });
  } else {
    res.render('index', { layout: false, articles: articles });
  }
});

router.get('/about', (req, res) => {
  res.render('about', { layout: false });
});

// router.get('/articles', (req, res) => {
//   res.render('articles', { layout: false });
// });

router.get('/my-page', (req, res) => {
  res.render('my-page', { layout: false });
});

router.get('/topic', (req, res) => {
  res.render('topic', { layout: false });
});

module.exports = router;
