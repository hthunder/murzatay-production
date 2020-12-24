const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');
const { body, validationResult } = require('express-validator');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/auth/test/signup', (req, res) => {
    console.log(req.body);
    process.exit();
  });

  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post('/api/auth/signin', controller.signin);
};
