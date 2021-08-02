const { default: axios } = require("axios")
const fs = require("fs")
const imagemin = require("imagemin")
const imageminMozjpeg = require("imagemin-mozjpeg")

const createFile = (data, path, cwd) => {
    const writer = fs.createWriteStream(path)
    writer.on("close", () => {
        imagemin([path], { 
            destination: `${cwd}/public/img/instagram/compressed`,
            plugins: [imageminMozjpeg({ quality: 20 })], 
        })
    })
    data.pipe(writer)
}

const downloadPhotos = async () => {
    try {
        const mediaList = await axios.get(
            `https://graph.instagram.com/me/media?fields=id&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
        )
        mediaList.data.data.forEach(async (media) => {
            const cwd = process.cwd()
            const pathToFolder = `${cwd}/public/img/instagram`
            const pathToFile = `${cwd}/public/img/instagram/${media.id}.jpg`
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
