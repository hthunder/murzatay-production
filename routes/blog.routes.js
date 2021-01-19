const { Router } = require('express');
const router = Router();
const Article = require('../models/article.model');
const User = require('../models/user.model');

router.get('/', async (req, res) => {
  const articles = await Article.find().sort('-createdAt').limit(2).lean();
  res.render('index', {
    layout: false,
    isLoggedIn: req.isLoggedIn,
    articles
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    layout: false,
    isLoggedIn: req.isLoggedIn
  });
});

router.get('/my-page', async (req, res) => {
  if (!req.isLoggedIn) {
    return res.redirect('/');
  } else {
    const user = await User.findOne({ _id: req.userId })
      .select('-password')
      .lean();
    res.render('my-page', { layout: false, user, isLoggedIn: req.isLoggedIn });
  }
});

module.exports = router;
