const { readdir } = require("fs/promises")
const path = require("path")

exports.getPhotosList = async () => {
    let files = null
    let shownPhotos
    let hiddenPhotos
    try {
        const appDir = path.dirname(require.main.filename)
        files = await readdir(`${appDir}/public/img/tmps`)
        shownPhotos = files.slice(0, 15)
        hiddenPhotos = files.slice(15, 18)
        return [shownPhotos, hiddenPhotos]
    } catch (err) {
        console.error(err)
        return [[], []]
    }
}
