import { commentsInit } from "./comments"
import { profileInfoInit } from "./profile-info"

export const router = (url) => {
    ;(async () => {
        switch (url) {
            case (url.match(/^\/articles\/\w+/) || {}).input:
                await commentsInit()
                break
            case (url.match(/^\/my-page$/) || {}).input:
                await profileInfoInit()
                break
            default:
        }
    })(url)
}
