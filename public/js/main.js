import { addFavourite } from "./widgets/addFavourite"
import { confirmAction } from "./utils/confirmAction"
import { router } from "./router"
import { setSizeControl } from "./utils/imgsizeControl"
import { sidebarComments } from "./widgets/sidebarComments"
import { sidebarInstagramWidget } from "./widgets/sidebarInstagramWidget"
import { authHandlerModule } from "./authHandler"
import { popupInit } from "./popupInit"
import { checkCookies } from "./utils/checkCookies"

const { ARTICLE_PREVIEW_SIZE_KB } = require("../../constants")

popupInit()
const imgInput = document.getElementById("image")
const submitBtn = document.querySelector(".edit__submit")
const articleFormImgInput = document.querySelector(".article-form__img-input")
const articleFormSubmitBtn = document.querySelector(".article-form__submit")

setSizeControl(200, submitBtn, imgInput)
setSizeControl(
    ARTICLE_PREVIEW_SIZE_KB,
    articleFormSubmitBtn,
    articleFormImgInput
)

const deleteArticleForms = document.querySelectorAll(".articles__delete-form")

deleteArticleForms.forEach((form) => {
    const deleteArticleButton = form.querySelector(".articles__delete-button")

    confirmAction(
        deleteArticleButton,
        "Вы уверены, что хотите удалить эту статью?",
        () => {
            form.submit()
        }
    )
})

/* Не закрываются выпадающие элементы при повторном клике */

const burger = document.querySelector(".nav__burger")
const menu = document.querySelector(".nav__list")

if (burger) {
    burger.onclick = () => {
        menu.classList.toggle("nav__list_opened")
    }
}

const search = document.querySelector(".nav__search")
const searchField = document.querySelector(".nav__search-form")

if (search) {
    search.onclick = () => {
        searchField.classList.toggle("nav__search-form_opened")
    }
}

const rubricBtn = document.querySelector(".header__rubrics-btn")
const rubrics = document.querySelector(".rubrics")

if (rubricBtn) {
    rubricBtn.onclick = () => {
        rubrics.classList.toggle("rubrics_opened")
    }
}

addFavourite()
checkCookies()

router(window.location.pathname)
sidebarComments()
sidebarInstagramWidget()

authHandlerModule()
