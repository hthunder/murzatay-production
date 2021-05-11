require("dotenv").config()
const path = require("path")

module.exports = {
    entry: {
        main: "./public/js/main.js",
    },
    mode: process.env.MODE,
    output: {
        path: path.resolve(__dirname, 'public/js/dist')
    },
    watch: true
}
