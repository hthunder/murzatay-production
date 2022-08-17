const express = require("express")
const exphbs = require("express-handlebars")
const cookieParser = require("cookie-parser")
const methodOverride = require("method-override") // TODO check that we need it
const auth = require("../routes/auth.routes")
const { isLoggedIn } = require("../middlewares/authJwt")
const articleRouter = require("../routes/articles.routes")
const blogRoutes = require("../routes/blog.routes")
const apiRoutes = require("../routes/api.routes")

exports.createServer = () => {
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

    return app
}
