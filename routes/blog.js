const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('index', { layout: false });
});

router.get('/about', (req, res) => {
  res.render('about', { layout: false });
});

router.get('/articles', (req, res) => {
  res.render('articles', { layout: false });
});

router.get('/my-page', (req, res) => {
  res.render('my-page', { layout: false });
});

router.get('/topic', (req, res) => {
  res.render('topic', { layout: false });
});

module.exports = router;
