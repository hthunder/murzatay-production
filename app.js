const { createServer } = require("./util/server")
const { initDB } = require("./util/db")

;(async function start() {
    try {
        await initDB()
        createServer().listen(3000, () => {
            console.log(`HTTP Server running on port 3000`)
        })
    } catch (e) {
        console.log(e)
        process.exit()
    }
})()
