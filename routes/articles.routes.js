const express = require('express');
const router = express.Router();
const controller = require('../controllers/articles.controller');
const util = require('../util/saveArticleAndRedirect');
const { isAdmin } = require('../middlewares/authJwt');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpeg');
  }
});

const upload = multer({ storage: storage });

// router.get('/', controller.articles_list);

// router.get('/page/:page', controller.articles_pagination);

// only for admins
router.get('/add', controller.article_create_get);

router.get(
  '/category/:category/page/:page',
  controller.articles_category_pagination
);

router.get('/category/:category', controller.article_category);

router.get('/:slug', controller.article_page);

// only for admins
router.get('/:id/edit', controller.article_edit_get);

router.put(
  '/:id',
  controller.article_edit_put,
  util.saveArticleAndRedirect('Edit')
);

router.delete('/:id', controller.article_remove);

router.post(
  '/add',
  upload.single('img'),
  controller.article_create_post,
  util.saveArticleAndRedirect('New')
);

module.exports = router;
