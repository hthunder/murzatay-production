require("dotenv").config({ path: "../.env" })
const path = require("path")

const PATH_TO_ROOT = path.resolve("../")
const { default: axios } = require("axios")
const fs = require("fs")
const imagemin = require("imagemin")
const imageminMozjpeg = require("imagemin-mozjpeg")

const indexCompressedFile = (pathToCompressedFile, timestamp, permalink) => {
    const pathToJson = `${PATH_TO_ROOT}/public/img/instagram/compressed/img-list.json`

    fs.readFile(pathToJson, (err, readData) => {
        if (err && err.code === "ENOENT") {
            return fs.writeFile(
                pathToJson,
                JSON.stringify({
                    imgList: [
                        {
                            path: pathToCompressedFile,
                            timestamp,
                            permalink
                        },
                    ],
                }),
                () => { }
            )
        }
        const json = JSON.parse(readData)

        json.imgList.push({
            path: pathToCompressedFile,
            timestamp,
            permalink
        })
        return fs.writeFile(pathToJson, JSON.stringify(json), () => { })
    })
}

const createFile = (data, pathToFile, timestamp, permalink) => {
    const writer = fs.createWriteStream(pathToFile)
    writer.on("close", async () => {
        try {
            const file = await imagemin([pathToFile], {
                destination: `${PATH_TO_ROOT}/public/img/instagram/compressed`,
                plugins: [imageminMozjpeg({ quality: 20 })],
            })
            indexCompressedFile(file[0].destinationPath, timestamp, permalink)
        } catch (e) {
            console.log("trycatcherror", e)
        }
    })
    data.pipe(writer)
}
// Добавить обработку 403 ответа
const downloadPhotos = async () => {
    try {
        const mediaList = await axios.get(
            `https://graph.instagram.com/me/media?fields=id&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
        )
        const pathToFolder = `${PATH_TO_ROOT}/public/img/instagram`

        mediaList.data.data.forEach(async (media) => {
            const pathToFile = `${pathToFolder}/${media.id}.jpg`

            if (!fs.existsSync(pathToFile)) {
                const {
                    data: { media_url: mediaUrl, timestamp, permalink },
                } = await axios.get(
                    `https://graph.instagram.com/${media.id}?fields=id,media_url,permalink,timestamp&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
                )
                const fileStream = await axios({
                    url: mediaUrl,
                    method: "GET",
                    responseType: "stream",
                })

                if (fileStream.headers["content-type"] === "image/jpeg") {
                    if (fs.existsSync(pathToFolder)) {
                        createFile(fileStream.data, pathToFile, timestamp, permalink)
                    } else {
                        fs.mkdir(
                            `${PATH_TO_ROOT}/public/img/instagram`,
                            { recursive: true },
                            () => {
                                createFile(
                                    fileStream.data,
                                    pathToFile,
                                    timestamp,
                                    permalink
                                )
                            }
                        )
                    }
                }
            }
        })
    } catch (e) {
        console.warn(e)
    }
}

downloadPhotos()
