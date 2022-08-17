// jest.setup.ts
const { MongoMemoryServer } = require("mongodb-memory-server")
const mongoose = require("mongoose")
const { seedDB } = require("./util/seedDB")

let mongo

/**
 * 1.
 * Initial setup step to be run ONCE BEFORE ALL test cases
 */
beforeAll(async () => {
    //
    mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
})

/**
 * 2.
 * Step to be run before each test case
 */
beforeEach(async () => {
    /**
     * 2.1
     * Get all collection in the MongoDB and remove all elements from them.
     * We do this to have a clean state between each test case so we don't introduce
     * side effects inside the test cases, affecting other test cases
     */
    if (mongo) {
        const collections = await mongoose.connection.db.collections()
        await Promise.all(
            collections.map((collection) => collection.deleteMany({}))
        )
        await seedDB()
    }
})

/**
 * 3.
 * Final "cleanup" step to be run after all the test cases finished
 */
afterAll(async () => {
    if (mongo) {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
        await mongo.stop()
    }
})
