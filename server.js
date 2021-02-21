require("dotenv").config()
const express = require("express")
const exphbs = require("express-handlebars")
const cookieParser = require("cookie-parser")
const methodOverride = require("method-override")
const bcrypt = require("bcryptjs")
const apiAuth = require("./routes/auth.routes")
const articleRouter = require("./routes/articles.routes")
const { isLoggedIn, isAdmin } = require("./middlewares/authJwt")

const blogRoutes = require("./routes/blog.routes")
const userRoutes = require("./routes/user.routes")
const apiRoutes = require("./routes/api.routes")

const db = require("./models")

const Role = db.role
const User = db.user

const app = express()
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    runtimeOption: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

app.use(cookieParser())

// parse request of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

// routes
app.use("/api/auth", apiAuth)
app.use("/articles", isLoggedIn, isAdmin, articleRouter)
app.use("/users", isLoggedIn, userRoutes)
app.use("/api", isLoggedIn, apiRoutes)
// require('./routes/user.routes')(app);
app.use("/", isLoggedIn, blogRoutes)

app.use(express.static("public"))

const PORT = process.env.PORT || 3000
const username = process.env.DB_ADMIN_USERNAME
const password = process.env.DB_ADMIN_PASSWORD

const initial = async () => {
    try {
        const count = await Role.estimatedDocumentCount()
        if (count === 0) {
            await new Role({
                name: "user"
            }).save()

            await new Role({
                name: "moderator"
            }).save()

            const role = await new Role({
                name: "admin"
            }).save()
            User.create({
                roles: [role.id],
                username: "",
                email: "@mail.ru",
                password: bcrypt.hashSync("", 8)
            })
        }
    } catch (e) {
        console.log(e)
    }
}

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
        )
        initial()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
        process.exit()
    }
}

start()
