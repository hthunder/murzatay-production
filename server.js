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
const Landing = require("./models/landing.model")

const blogRoutes = require("./routes/blog.routes")
const apiRoutes = require("./routes/api.routes")
const { RUBRICS } = require("./constants")

const db = require("./models")

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
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

app.use("/auth", auth)
app.use("/articles", isLoggedIn, articleRouter)
app.use("/api", apiRoutes)
app.use("/", isLoggedIn, blogRoutes)
app.use("/tinymce", express.static("node_modules/tinymce"))

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500
    return res.status(error.statusCode).json({ error: error.toString() })
})

const initDB = async () => {
    try {
        const username = process.env.DB_ADMIN_USERNAME
        const password = process.env.DB_ADMIN_PASSWORD
        const email = process.env.DB_ADMIN_EMAIL

        await db.mongoose.connect("mongodb://localhost:27017/murzatay", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })

        RUBRICS.forEach(async (rubricName) => {
            const rubric = await Rubric.find({ name: rubricName })
            if (rubric.length === 0) {
                await new Rubric({ name: rubricName }).save()
            }
        })

        const admin = await User.findOne({ username, email })
        if (!admin) {
            User.create({
                role: "admin",
                username,
                email,
                password: bcrypt.hashSync(password, 8),
                active: true,
            })
        }

        const aboutLanding = await Landing.findOne({ path: "/about/edit" })
        if (!aboutLanding) {
            await Landing.create({
                markdown: "hello world",
                sanitizedHTML: "hello world",
                path: "/about/edit",
            })
        }

        const indexLanding = await Landing.findOne({ path: "/index/edit" })
        if (!indexLanding) {
            await Landing.create({
                markdown: "hello world",
                sanitizedHTML: "hello world",
                path: "/index/edit",
            })
        }
    } catch (e) {
        console.log(e)
    }
}

;(async function start() {
    try {
        await initDB()
        app.listen(3000, () => {
            console.log(`HTTP Server running on port 3000`)
        })
    } catch (e) {
        console.log(e)
        process.exit()
    }
})()
