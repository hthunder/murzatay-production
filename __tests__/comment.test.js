const request = require("supertest")

// process.env.NODE_ENV = "test"
// const { initDB } = require("../util/db")
const { createServer } = require("../util/server")
const Comment = require("../models/comment.model")
const User = require("../models/user.model")

const app = createServer()

describe("comment", () => {
    describe("get route", () => {
        it("should return 3 comments", async () => {
            const admin = await User.findOne({ role: "admin" })

            await Comment.insertMany([
                { user: admin._id, text: "Some text" },
                { user: admin._id, text: "Some text" },
                { user: admin._id, text: "Some text" },
            ])

            await request(app)
                .get("/api/comments")
                .then((response) => {
                    expect(response.body.length).toBe(3)
                })
        })
    })

    describe("post route", () => {
        it("should fail comment creation without auth data", async () => {
            await request(app)
                .post("/api/comments")
                .then((response) => {
                    expect(response.status).toBe(401)
                })
        })
    })
})

// cant create a comment with empty text
