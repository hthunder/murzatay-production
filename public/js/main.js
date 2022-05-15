import { addFavourite } from "./widgets/addFavourite"
import { confirmAction } from "./utils/confirmAction"
import { router } from "./router"
import { setSizeControl } from "./utils/imgsizeControl"
import { sidebarComments } from "./widgets/sidebarComments"
import { sidebarInstagramWidget } from "./widgets/sidebarInstagramWidget"
import { errorHandler } from "./errorHandler"
import { popupInit } from "./popupInit"
import { checkCookies } from "./utils/checkCookies"
import { ARTICLE_PREVIEW_SIZE_KB } from "../../constants"
import { querySelectorMultiple } from "./utils/querySelectorMultiple"
import { toggleDisplayNone } from "./utils/toggleDisplayNone"
import { signupFormValidator } from "./forms/signupFormValidator"

popupInit()

// article creation page
const articleFormImgInput = document.querySelector(".article-form__img-input")
const articleFormSubmitBtn = document.querySelector(".article-form__submit")
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

const [burger, menu, searchForm, logo, searchIcon] = querySelectorMultiple(
    ".nav__burger",
    ".nav__list",
    ".nav__search-form",
    ".nav__logo",
    ".nav__search"
)

burger &&
    burger.addEventListener("click", () => {
        menu.classList.toggle("nav__list_opened")
        searchForm.classList.toggle("nav__search-form_opened")
        toggleDisplayNone(logo)
    })

searchIcon &&
    searchIcon.addEventListener("click", () => {
        searchForm.submit()
    })

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

errorHandler()
signupFormValidator()
