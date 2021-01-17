const express = require('express');
const router = express.Router();
const controller = require('../controllers/articles.controller');
const util = require('../util/saveArticleAndRedirect');
const { isAdmin } = require('../middlewares/authJwt');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/public/img/previews');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpeg');
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 20 }
}).single('img');

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
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // if (req.originalUrl == '/articles/add') {
				//TODO вынести в отдельную мидлвару с определением откуда запрос
        return res.render('article_create_edit', {
          layout: false,
          page_title: 'Новая статья',
          page_action: '/articles/add',
          article: {
            title: req.body.title,
            markdown: req.body.markdown,
            description: req.body.description,
            errors: err
          }
        });
      } else {
        return next();
      }
    });
  },
  controller.article_create_post,
  util.saveArticleAndRedirect('New')
);

module.exports = router;
