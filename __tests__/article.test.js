const request = require("supertest")
const mongoose = require("mongoose")
// const isEqual = require("lodash.isequal")

const { createServer } = require("../util/server")
const Article = require("../models/article.model")
const Rubric = require("../models/rubric.model")
const User = require("../models/user.model")

const app = createServer()

const generateArticles = async (number) => {
    const arrayOfLength = Array(...Array(number))
    const rubrics = await Rubric.find()

    return arrayOfLength.map((val, index) => {
        const randomIndex = Math.floor(Math.random() * rubrics.length)

        return {
            title: `Article title ${index}`,
            description: `Article description ${index}`,
            markdown: `<h1>Article markdown ${index}</h1>`,
            rubric: rubrics[randomIndex]._id,
        }
    })
}

const arrayEquals = (a, b) => {
    return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, i) => {
            return JSON.stringify(val) === JSON.stringify(b[i])
        })
    )
}

describe("article", () => {
    describe("get article collection route", () => {
        it("should return all existing articles", async () => {
            const generatedArticles = await generateArticles(2)
            await Article.insertMany(generatedArticles)

            await request(app)
                .get(`/api/articles`)
                .then((response) => {
                    expect(response.body.length).toBe(2)
                    expect(response.statusCode).toBe(200)
                })
        })

        it("should return a limited number of articles with limit query param", async () => {
            const generatedArticles = await generateArticles(2)
            await Article.insertMany(generatedArticles) // check that these documents have different timestamps or not

            await request(app)
                .get(`/api/articles?limit=1`)
                .then((response) => {
                    expect(response.body.length).toBe(1)
                    expect(response.statusCode).toBe(200)
                })
        })

        it("should skip articles with limit and page query params", async () => {
            const generatedArticles = await generateArticles(10)
            const result = await Article.insertMany(generatedArticles)
            const expected = result.slice(5)

            await request(app)
                .get(`/api/articles?limit=5&page=2`)
                .then((response) => {
                    expect(arrayEquals(expected, response.body)).toBe(true)
                    expect(response.statusCode).toBe(200)
                })
        })

        it("should sort articles in descending order with sortOrder=desc flag", async () => {
            const olderArticle = await Article.create({
                title: `Article title 1`,
                description: `Article description 1`,
                markdown: `<h1>Article markdown 1</h1>`,
                createdAt: new Date(1995, 11, 22),
            })

            const newerArticle = await Article.create({
                title: `Article title 2`,
                description: `Article description 2`,
                markdown: `<h1>Article markdown 2</h1>`,
                createdAt: new Date(2022, 7, 16),
            })

            await request(app)
                .get(`/api/articles?sortOrder=desc`)
                .then((response) => {
                    expect(
                        arrayEquals([newerArticle, olderArticle], response.body)
                    ).toBe(true)
                    expect(response.statusCode).toBe(200)
                })
        })

        it("should sort articles in ascending order without flag", async () => {
            const olderArticle = await Article.create({
                title: `Article title 1`,
                description: `Article description 1`,
                markdown: `<h1>Article markdown 1</h1>`,
                createdAt: new Date(1995, 11, 22),
            })

            const newerArticle = await Article.create({
                title: `Article title 2`,
                description: `Article description 2`,
                markdown: `<h1>Article markdown 2</h1>`,
                createdAt: new Date(2022, 7, 16),
            })

            await request(app)
                .get(`/api/articles`)
                .then((response) => {
                    expect(
                        arrayEquals([olderArticle, newerArticle], response.body)
                    ).toBe(true)
                    expect(response.statusCode).toBe(200)
                })
        })

        it("should search articles with corresponding title", async () => {
            const generatedArticles = await generateArticles(10)
            await Article.insertMany(generatedArticles)

            await request(app)
                .get(`/api/articles?q=Article title 3`)
                .then(async (response) => {
                    const foundArticle = await Article.findOne({
                        title: "Article title 3",
                    }).lean()

                    expect(response.body[0]).toEqual(
                        JSON.parse(JSON.stringify(foundArticle))
                    )
                    expect(response.statusCode).toBe(200)
                })
        })

        it("should return articles only from chosen category", async () => {
            const generatedArticles = await generateArticles(10)
            const articles = await Article.insertMany(generatedArticles)
            const rubrics = await Rubric.find().lean()
            const selectedRubric = rubrics[0]
            const articlesNumber = articles.filter((cur) => {
                return cur.rubric.toString() === selectedRubric._id.toString()
            }).length

            await request(app)
                .get(`/api/articles?category=${selectedRubric.slug}`)
                .then((response) => {
                    expect(response.body.length).toBe(articlesNumber)
                    expect(response.statusCode).toBe(200)
                })
        })
    })

    describe("get article by article id route", () => {
        it("should return corresponding article", async () => {
            const title = "Unique article title"

            const article = await Article.create({
                title,
                description: "Article description",
                markdown: "<h1>Article markdown</h1>",
            })

            await request(app)
                .get(`/api/articles/${article._id}`)
                .then((response) => {
                    expect(response.statusCode).toBe(200)
                    expect(response.body.title).toBe(title)
                })
        })

        it("should return nothing if the article with given id doesn't exist", async () => {
            const id = mongoose.Types.ObjectId()

            await request(app)
                .get(`/api/articles/${id}`)
                .then((response) => {
                    expect(response.statusCode).toBe(404)
                })
        })

        it("should return the internal server error if the id can't be cast to ObjectId", async () => {
            await request(app)
                .get(`/api/articles/non-castable-id`)
                .then((response) => {
                    expect(response.statusCode).toBe(500)
                })
        })

        it("should return the corresponding article by slug with slug search param", async () => {
            const title = "Unique article title"

            const article = await Article.create({
                title,
                description: "Article description",
                markdown: "<h1>Article markdown</h1>",
            })

            await request(app)
                .get(`/api/articles/${article.slug}?slugSearch=true`)
                .then((response) => {
                    expect(response.statusCode).toBe(200)
                    expect(response.body.title).toBe(title)
                })
        })

        it("shouldn't find an article by slug without a slug search param", async () => {
            const title = "Unique article title"

            const article = await Article.create({
                title,
                description: "Article description",
                markdown: "<h1>Article markdown</h1>",
            })

            await request(app)
                .get(`/api/articles/${article.slug}`)
                .then((response) => {
                    expect(response.statusCode).toBe(500)
                })
        })

        // it("")

        // TODO check comments cleaning on comment removing
    })
})
