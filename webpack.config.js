require("dotenv").config()
const path = require("path")

module.exports = {
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
    // module: {
    //     rules: [
    //         {
    //             test: /\.m?js$/,
    //             exclude: /(node_modules|bower_components)/,
    //             use: {
    //                 loader: "babel-loader",
    //                 options: {
    //                     presets: ["@babel/preset-env"],
    //                     plugins: ["@babel/plugin-proposal-optional-chaining"],
    //                 },
    //             },
    //         },
    //     ],
    // },
    mode: process.env.MODE,
    output: {
        path: path.resolve(__dirname, "public/js/dist"),
    },
    watch: true,
}
