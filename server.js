require("dotenv").config()
const express = require("express")
const exphbs = require("express-handlebars")
const cookieParser = require("cookie-parser")
const methodOverride = require("method-override")
const bcrypt = require("bcryptjs")
const auth = require("./routes/auth.routes")
const articleRouter = require("./routes/articles.routes")
const { isLoggedIn } = require("./middlewares/authJwt")
const Rubric = require("./models/rubric.model")

const blogRoutes = require("./routes/blog.routes")
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
        allowProtoMethodsByDefault: true,
    },
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
app.use("/auth", auth)
app.use("/articles", isLoggedIn, articleRouter)
app.use("/api", isLoggedIn, apiRoutes)
app.use("/", isLoggedIn, blogRoutes)
app.use(express.static("public"))

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500
    return res.status(error.statusCode).json({ error: error.toString() })
})

const PORT = process.env.PORT || 3000
const username = process.env.DB_ADMIN_USERNAME
const password = process.env.DB_ADMIN_PASSWORD
const email = process.env.DB_ADMIN_EMAIL

const initial = async () => {
    try {
        const rubrics = [
            "Кормление",
            "Воспитание",
            "Уход",
            "Адаптация",
            "Пора к ветеринару?",
            "Коты доноры",
            "Коты спинальники",
            "Интересные факты",
            "Забавные истории",
        ]
        rubrics.forEach(async (rubricName) => {
            const rubric = await Rubric.find({ name: rubricName })
            if (rubric.length === 0) {
                await new Rubric({ name: rubricName }).save()
            }
        })

        const count = await Role.estimatedDocumentCount()
        if (count === 0) {
            const roleUser = await new Role({
                name: "user",
            }).save()

            const roleModerator = await new Role({
                name: "moderator",
            }).save()

            const roleAdmin = await new Role({
                name: "admin",
            }).save()
            User.create({
                roles: [roleUser.id, roleModerator.id, roleAdmin.id],
                username,
                email,
                password: bcrypt.hashSync(password, 8),
            })
        }
    } catch (e) {
        console.log(e)
    }
}

async function start() {
    try {
        await db.mongoose.connect(
            // `mongodb+srv://${username}:${password}@cluster0.m6k5m.mongodb.net/blog`,
            "mongodb://127.0.0.1:27017/murzatay",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            }
        )
        initial()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log("hey")
        console.log(e)
        process.exit()
    }
}

start()
