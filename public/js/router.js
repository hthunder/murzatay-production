import { commentsInit } from "./widgets/comments"
import { profileInfoInit } from "./widgets/profileInfo"
import { passwordReset } from "./pages/passwordReset"

export const router = (url) => {
    ;(async () => {
        switch (url) {
            case (url.match(/^\/articles\/\w+/) || {}).input:
                await commentsInit()
                break
            case (url.match(/^\/my-page$/) || {}).input:
                await profileInfoInit()
                break
            case (url.match(/^\/auth\/password-reset/) || {}).input:
                passwordReset()
                break
            default:
        }
    })(url)
}
