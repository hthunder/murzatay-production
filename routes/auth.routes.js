const express = require('express');
const router = express.Router();
const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');
const { check } = require('express-validator');

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.post(
  '/signup',
  [
    check('username', 'Введите логин').not().isEmpty(),
    check('email', 'Введите валидный email').isEmail(),
    check('password1').custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error('Пароли не совпадают');
      }
      return true;
    }),
    check('password1', 'Пароль должен содержать от 6 до 30 символов').isLength({
      min: 6,
      max: 30
    }),
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  controller.signup
);

router.post('/signin', controller.signin);

module.exports = router;
