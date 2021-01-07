const { check } = require('express-validator');
const { verifySignUp } = require('./');

exports.signup = [
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
];
