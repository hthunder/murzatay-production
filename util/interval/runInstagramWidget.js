const { default: axios } = require("axios")
const fs = require("fs")
const imagemin = require("imagemin")
const imageminMozjpeg = require("imagemin-mozjpeg")

const indexCompressedFile = (pathToCompressedFile, cwd, timestamp) => {
    const pathToJson = `${cwd}/public/img/instagram/compressed/img-list.json`

    fs.readFile(pathToJson, (err, readData) => {
        if (err && err.code === "ENOENT") {
            return fs.writeFile(
                pathToJson,
                JSON.stringify({
                    imgList: [
                        {
                            path: pathToCompressedFile,
                            timestamp,
                        },
                    ],
                }),
                () => {}
            )
        }
        const json = JSON.parse(readData)

        json.imgList.push({
            path: pathToCompressedFile,
            timestamp,
        })
        return fs.writeFile(pathToJson, JSON.stringify(json), () => {})
    })
}

const createFile = (data, path, cwd, timestamp) => {
    const writer = fs.createWriteStream(path)
    writer.on("close", async () => {
        try {
            const file = await imagemin([path], {
                destination: `${cwd}/public/img/instagram/compressed`,
                plugins: [imageminMozjpeg({ quality: 20 })],
            })
            indexCompressedFile(file[0].destinationPath, cwd, timestamp)
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
        const cwd = process.cwd()
        const pathToFolder = `${cwd}/public/img/instagram`

        mediaList.data.data.forEach(async (media) => {
            const pathToFile = `${pathToFolder}/${media.id}.jpg`

            if (!fs.existsSync(pathToFile)) {
                const {
                    data: { media_url, timestamp },
                } = await axios.get(
                    `https://graph.instagram.com/${media.id}?fields=id,media_url,timestamp&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
                )
                const fileStream = await axios({
                    url: media_url,
                    method: "GET",
                    responseType: "stream",
                })

                if (fileStream.headers["content-type"] === "image/jpeg") {
                    if (fs.existsSync(pathToFolder)) {
                        createFile(fileStream.data, pathToFile, cwd, timestamp)
                    } else {
                        fs.mkdir(
                            `${cwd}/public/img/instagram`,
                            { recursive: true },
                            () => {
                                createFile(
                                    fileStream.data,
                                    pathToFile,
                                    cwd,
                                    timestamp
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

exports.runInstagramWidget = () => {
    downloadPhotos()
    // setInterval(() => console.log("widget"), 1500)
}
