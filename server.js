require("dotenv").config()
const express = require("express")
const exphbs = require("express-handlebars")
const cookieParser = require("cookie-parser")
const methodOverride = require("method-override")
const bcrypt = require("bcryptjs")
const fs = require("fs")
const http = require("http")
const https = require("https")
const compression = require("compression")
const auth = require("./routes/auth.routes")
const articleRouter = require("./routes/articles.routes")
const { isLoggedIn } = require("./middlewares/authJwt")
const { checkSecureConnection } = require("./middlewares/checkSecureConnection")
const Rubric = require("./models/rubric.model")

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

if (process.env.MODE === "production") {
    app.use(checkSecureConnection)
}
app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

app.use("/auth", auth)
app.use("/articles", isLoggedIn, articleRouter)
app.use("/api", isLoggedIn, apiRoutes)
app.use("/", isLoggedIn, blogRoutes)
app.use(express.static("public"))
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
    } catch (e) {
        console.log(e)
    }
}

const httpServer = http.createServer(app)

const createHttpsServer = () => {
    const privateKey = fs.readFileSync(
        "/etc/letsencrypt/live/murzatay.ru/privkey.pem",
        "utf8"
    )
    const certificate = fs.readFileSync(
        "/etc/letsencrypt/live/murzatay.ru/cert.pem",
        "utf8"
    )
    const ca = fs.readFileSync(
        "/etc/letsencrypt/live/murzatay.ru/chain.pem",
        "utf8"
    )

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca,
    }
    return https.createServer(credentials, app)
}

;(async function start() {
    try {
        const httpPort = process.env.MODE === "production" ? 80 : 3000

        await initDB()

        httpServer.listen(httpPort, () => {
            console.log(`HTTP Server running on port ${httpPort}`)
        })

        if (process.env.MODE === "production") {
            const httpsServer = createHttpsServer()
            const httpsPort = 443
            httpsServer.listen(httpsPort, () => {
                console.log(`HTTPS Server running on port ${httpsPort}`)
            })
        }
    } catch (e) {
        console.log(e)
        process.exit()
    }
})()
