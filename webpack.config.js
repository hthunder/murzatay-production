const path = require("path")

module.exports = (env, argv) => ({
    entry: {
        main: "./public/js/main.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    mode: argv.mode,
    output: {
        path: path.resolve(__dirname, "public/js/dist"),
    },
    watch: argv.mode === "development",
})
