const express = require('express');
const router = express.Router();
const controller = require('../controllers/articles.controller');
const util = require('../util/saveArticleAndRedirect');

router.get('/', controller.articles_list);

router.get('/add', controller.article_create_get);

router.get('/:slug', controller.article_page);

router.get('/:id/edit', controller.article_edit_get);

router.put(
  '/:id',
  controller.article_edit_put,
  util.saveArticleAndRedirect('Edit')
);

router.delete('/:id', controller.article_remove);

router.post(
  '/add',
  controller.article_create_post,
  util.saveArticleAndRedirect('New')
);

module.exports = router;
