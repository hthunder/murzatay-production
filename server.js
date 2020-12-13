const { response } = require('express');
const express = require('express');

const app = express();

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use('/index-admin(.html)?', (req, res) => {
  res.render('index-admin.hbs');
});

app.use('/index(.html)?', (req, res) => {
  res.render('index.hbs');
});

app.use('/about-admin(.html)?', (req, res) => {
  res.render('about-admin.hbs');
});

app.use('/about(.html)?', (req, res) => {
  res.render('about.hbs');
});

app.use('/articles-admin(.html)?', (req, res) => {
  res.render('articles-admin.hbs');
});

app.use('/articles(.html)?', (req, res) => {
  res.render('articles.hbs');
});

app.use('/my-page(.html)?', (req, res) => {
  res.render('my-page.hbs');
});

app.use('/topic(.html)?', (req, res) => {
  res.render('topic.hbs');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
