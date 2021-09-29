import { commentsInit } from "./comments"
import { profileInfoInit } from "./profileInfo"
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
