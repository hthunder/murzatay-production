import { commentsInit } from "./comments.js"

export const router = (url) => {
    (async () => {
        switch (url) {
            case (url.match(/^\/articles\/\w+/) || {}).input:
                await commentsInit()
                break
            default:
        }
    })(url)
}
