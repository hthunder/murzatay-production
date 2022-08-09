const path = require("path")

module.exports = (env, argv) => ({
    entry: {
        main: "./public/js/main.js",
        comments: "./public/js/react/components/comments/Comments.jsx",
        profile: "./public/js/react/components/profile/Profile.jsx",
        nav: "./public/js/react/components/nav/Nav.jsx",
        like: "./public/js/react/components/like-button/LikeButton.jsx",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName:
                                    "[name]__[local]--[hash:base64:5]", // TODO '[hash:base64]' for production
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
        ],
    },
    mode: argv.mode,
    output: {
        path: path.resolve(__dirname, "public/js-build"),
    },
    watch: argv.mode === "development",
})
