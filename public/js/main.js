import { addFavourite } from "./addFavourite"
import { showMore } from "./instagram_widget"
import { areYouSurePrompt } from "./areYouSure"
import { router } from "./router"
import { setSizeControl } from "./imgsize_control"
import { sidebarComments } from "./sidebarComments"
import { sidebarInstagramWidget } from "./sidebarInstagramWidget"
import { authHandlerModule } from "./authHandler"
import { popupInit } from "./popupInit"

popupInit()
const imgInput = document.getElementById("image")
const submitBtn = document.querySelector(".edit__submit")

setSizeControl(200, submitBtn, imgInput)

const deleteArticleButton = document.querySelector(".articles__delete-button")
const deleteArticleForm = document.querySelector(".articles__delete-form")
areYouSurePrompt(
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

function checkCookies() {
    const cookieDate = localStorage.getItem("cookieDate")
    const cookieNotification = document.getElementById("cookie_notification")
    const cookieBtn = cookieNotification.querySelector(".cookie__button")

    // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы
    if (!cookieDate || +cookieDate + 31536000000 < Date.now()) {
        cookieNotification.classList.add("show")
    }

    // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX
    cookieBtn.addEventListener("click", () => {
        localStorage.setItem("cookieDate", Date.now())
        cookieNotification.classList.remove("show")
    })
}
checkCookies()

router(window.location.pathname)
sidebarComments()
sidebarInstagramWidget().then(() => {
    document.querySelector(".instagram-widget__hide-btn").onclick = showMore
})

authHandlerModule()
