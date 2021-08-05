const fs = require("fs")

exports.getPhotosList = async () => {
    const fileBuffer = fs.readFileSync(
        "public/img/instagram/compressed/img-list.json"
    )
    const { imgList } = JSON.parse(fileBuffer)
    imgList.sort((firstEl, secondEl) => {
        const firstStamp = new Date(firstEl.timestamp)
        const secondStamp = new Date(secondEl.timestamp)
        return secondStamp - firstStamp
    })
    return imgList
}
