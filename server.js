const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const exphbs = require('express-handlebars');
const blogRoutes = require('./routes/blog');

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(blogRoutes);
app.use(express.static('public'));

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
