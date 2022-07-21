import Navigo from "navigo"
import { init } from "./widgets/comments/init"
import { initProfileComponet } from "./widgets/profileInfo"
import { passwordReset } from "./pages/passwordReset"
import { ARTICLE_PREVIEW_SIZE_KB } from "../../constants"
import { setSizeControl } from "./utils/imgsizeControl"
import { $ } from "./utils/$"
import { initArticleRemovingHandlers } from "./pages/articles"

const workWithArticles = () => {
    const articleFormImgInput = $(".article-editor__form-file")
    const articleFormSubmitBtn = $(".article-editor__form-submit")
    setSizeControl(
        ARTICLE_PREVIEW_SIZE_KB,
        articleFormSubmitBtn,
        articleFormImgInput
    )
}

export const router = () => {
    const navigoRouter = new Navigo("/")
    navigoRouter.on("/articles", initArticleRemovingHandlers)
    navigoRouter.on("/articles/add", workWithArticles)
    navigoRouter.on("/articles/:id/edit", workWithArticles)
    navigoRouter.on("/articles/:id", init)
    navigoRouter.on("/my-page", initProfileComponet)
    navigoRouter.on("/auth/password-reset", passwordReset)
    navigoRouter.resolve()
}
