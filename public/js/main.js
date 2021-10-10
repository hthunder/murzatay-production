import { addFavourite } from "./widgets/addFavourite"
import { confirmAction } from "./utils/confirmAction"
import { router } from "./router"
import { setSizeControl } from "./utils/imgsizeControl"
import { sidebarComments } from "./widgets/sidebarComments"
import { sidebarInstagramWidget } from "./widgets/sidebarInstagramWidget"
import { authHandlerModule } from "./authHandler"
import { popupInit } from "./popupInit"
import { checkCookies } from "./utils/checkCookies"

popupInit()
const imgInput = document.getElementById("image")
const submitBtn = document.querySelector(".edit__submit")

setSizeControl(200, submitBtn, imgInput)

const deleteArticleButton = document.querySelector(".articles__delete-button")
const deleteArticleForm = document.querySelector(".articles__delete-form")
confirmAction(
    deleteArticleButton,
    "Вы уверены, что хотите удалить эту статью?",
    () => {
        deleteArticleForm.submit()
    }
)

/* Не закрываются выпадающие элементы при повторном клике */

const burger = document.querySelector(".nav__burger")
const menu = document.querySelector(".nav__list")

burger.onclick = () => {
    menu.classList.toggle("nav__list_opened")
}

const search = document.querySelector(".nav__search")
const searchField = document.querySelector(".nav__search-form")

search.onclick = () => {
    searchField.classList.toggle("nav__search-form_opened")
}

const rubricBtn = document.querySelector(".header__rubrics-btn")
const rubrics = document.querySelector(".rubrics")

rubricBtn.onclick = () => {
    rubrics.classList.toggle("rubrics_opened")
}

addFavourite()
checkCookies()

router(window.location.pathname)
sidebarComments()
sidebarInstagramWidget()

authHandlerModule()
