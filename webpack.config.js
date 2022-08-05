const path = require("path")

module.exports = (env, argv) => ({
    entry: {
        main: "./public/js/main.js",
        comments: "./public/js/react/comments/Comments.jsx",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
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
