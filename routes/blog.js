const { Router } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const router = Router();

router.get('/', (req, res) => {
  // if ()
  // app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);
  // console.log(req.headers);
  console.log(req.cookies);
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
  console.log(authorized);
  if (authorized) {
    console.log('he');
    res.render('index', { layout: false, authorized: true });
  } else {
    res.render('index', { layout: false });
  }
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
