const db = require("../models")
const { seedDB } = require("./seedDB")
require("dotenv").config()

exports.initDB = async () => {
    try {
        await db.mongoose.connect(`mongodb://localhost:27017/murzatay`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        await seedDB()
    } catch (e) {
        console.log(e)
    }
}
