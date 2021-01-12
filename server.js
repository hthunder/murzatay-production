require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const apiAuth = require('./routes/auth.routes');
const articleRouter = require('./routes/articles.routes');
const { isLoggedIn, isAdmin } = require('./middlewares/authJwt');
const bcrypt = require('bcryptjs');

const blogRoutes = require('./routes/blog.routes');

const db = require('./models');
const Role = db.role;
const User = db.user;

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOption: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(cookieParser());

//parse request of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

//routes
app.use('/api/auth', apiAuth);
app.use('/articles', isLoggedIn, isAdmin, articleRouter);
// require('./routes/user.routes')(app);
app.use('/', isLoggedIn, blogRoutes);

app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
const username = process.env.DB_ADMIN_USERNAME;
const password = process.env.DB_ADMIN_PASSWORD;

async function start() {
  try {
    await db.mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.m6k5m.mongodb.net/blog`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    );
    initial();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

start();

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }
        console.log(`added 'user' to roles collection`);
      });

      new Role({
        name: 'moderator'
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }
        console.log(`added 'moderator' to roles collection`);
      });

      new Role({
        name: 'admin'
      }).save((err, role) => {
        if (err) {
          console.log('error', err);
        }
        User.create({
          roles: [role.id],
          username: 'admin',
          email: 'admin@mail.ru',
          password: bcrypt.hashSync('admin', 8)
        });
        console.log(`added 'admin' to roles collection`);
      });
    }
  });
}
