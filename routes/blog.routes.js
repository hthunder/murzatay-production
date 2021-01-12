const { Router } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { verifyToken } = require('../middlewares/authJwt');
const router = Router();
const Article = require('../models/article.model');
const User = require('../models/user.model');

router.get('/', async (req, res) => {
  console.log('main page');
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

router.get('/my-page', verifyToken, async (req, res) => {
  const user = await User.findOne({ _id: req.userId })
    .select('-password')
    .lean();
  console.log(user);
  res.render('my-page', { layout: false, user });
});

router.get('/topic', (req, res) => {
  res.render('topic', { layout: false });
});

module.exports = router;
