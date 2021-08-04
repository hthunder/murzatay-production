const { default: axios } = require("axios")
const fs = require("fs")
const imagemin = require("imagemin")
const imageminMozjpeg = require("imagemin-mozjpeg")

const indexCompressedFile = (pathToCompressedFile, cwd) => {
    const pathToJson = `${cwd}/public/img/instagram/compressed/img-list.json`

    fs.readFile(pathToJson, (err, readData) => {
        if (err && err.code === "ENOENT") {
            return fs.writeFile(
                pathToJson,
                JSON.stringify({
                    imgList: [
                        {
                            path: pathToCompressedFile,
                        },
                    ],
                }),
                () => {}
            )
        }
        const json = JSON.parse(readData)

        json.imgList.push({
            path: pathToCompressedFile,
        })
        return fs.writeFile(pathToJson, JSON.stringify(json), () => {})
    })
}

const createFile = (data, path, cwd) => {
    const writer = fs.createWriteStream(path)
    writer.on("close", async () => {
        try {
            console.log("before")
            const file = await imagemin([path], {
                destination: `${cwd}/public/img/instagram/compressed`,
                plugins: [imageminMozjpeg({ quality: 20 })],
            })
            console.log('after', file)
            indexCompressedFile(file[0].destinationPath, cwd)
        } catch (e) {
            console.log('trycatcherror', e)
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
                const mediaInfo = await axios.get(
                    `https://graph.instagram.com/${media.id}?fields=id,media_url&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
                )
                const fileStream = await axios({
                    url: mediaInfo.data.media_url,
                    method: "GET",
                    responseType: "stream",
                })

                if (fileStream.headers["content-type"] === "image/jpeg") {
                    if (fs.existsSync(pathToFolder)) {
                        createFile(fileStream.data, pathToFile, cwd)
                    } else {
                        fs.mkdir(
                            `${cwd}/public/img/instagram`,
                            { recursive: true },
                            () => {
                                createFile(fileStream.data, pathToFile, cwd)
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
