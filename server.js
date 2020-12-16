const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const hbs = require('hbs');

const app = express();

// app.use(express.static('public'));
// app.set('view engine', 'hbs');
// hbs.registerPartials(__dirname + '/views/partials');

// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.get('/about', (req, res) => {
//   res.render('about');
// });

// app.get('/articles', (req, res) => {
//   res.render('articles');
// });

// app.get('/my-page', (req, res) => {
//   res.render('my-page');
// });

// app.get('/topic', (req, res) => {
//   res.render('topic');
// });
const PORT = process.env.PORT || 5000;
const username = process.env.DB_ADMIN_USERNAME;
const password = process.env.DB_ADMIN_PASSWORD;

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.m6k5m.mongodb.net/blog`,
      {
				useNewUrlParser: true,
				useUnifiedTopology: true,
        useFindAndModify: false
      }
    );
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
