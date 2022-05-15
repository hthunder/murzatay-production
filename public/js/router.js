import { commentsInit } from "./widgets/comments"
import { initProfileComponet } from "./widgets/profileInfo"
import { passwordReset } from "./pages/passwordReset"
import { ARTICLE_PREVIEW_SIZE_KB } from "../../constants"
import { setSizeControl } from "./utils/imgsizeControl"

const workWithArticles = () => {
    const articleFormImgInput = document.querySelector(
        ".article-form__img-input"
    )
    const articleFormSubmitBtn = document.querySelector(".article-form__submit")
    setSizeControl(
        ARTICLE_PREVIEW_SIZE_KB,
        articleFormSubmitBtn,
        articleFormImgInput
    )
}

export const router = (url) => {
    ;(async () => {
        switch (url) {
            case (url.match(/^\/articles\/add$/) || {}).input:
            case (url.match(/^\/articles\/\w+\/edit$/) || {}).input:
                workWithArticles()
                break
            case (url.match(/^\/articles\/\w+/) || {}).input:
                await commentsInit()
                break
            case (url.match(/^\/my-page$/) || {}).input:
                await initProfileComponet()
                break
            case (url.match(/^\/auth\/password-reset/) || {}).input:
                passwordReset()
                break
            default:
        }
    })(url)
}
