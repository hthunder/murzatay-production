import { confirmAction } from "./utils/confirmAction"
import { router } from "./router"
import { sidebarComments } from "./widgets/sidebarComments"
import { errorHandler } from "./errorHandler"
import { popupInit } from "./popupInit"
import { checkCookies } from "./utils/checkCookies"
import { querySelectorMultiple } from "./utils/querySelectorMultiple"
import { toggleDisplayNone } from "./utils/toggleDisplayNone"
import { signupFormValidator } from "./forms/signupFormValidator"
import * as api from "./api/api"

popupInit()

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

const favouriteBtn = document.querySelector(".topic__add-favourite")
if (favouriteBtn) {
    favouriteBtn.onclick = () => api.addFavourite(favouriteBtn)
}

checkCookies()

router(window.location.pathname)
sidebarComments()

errorHandler()
signupFormValidator()
