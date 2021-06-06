import { addFavourite } from "./addFavourite.js"
import { sendForm } from "./sendFormData.js"
import { showMore } from "./instagram_widget.js"
import { slideToggle, fadeIn, fadeOut } from "./animations.js"
import { setAboutEditFormListener } from "./about.js"
import { areYouSurePrompt } from "./areYouSure.js"

setAboutEditFormListener()

const deleteArticleButton = document.querySelector(".articles__delete-button")
const deleteArticleForm = document.querySelector(".articles__delete-form")
areYouSurePrompt(deleteArticleButton, "Вы уверены, что хотите удалить эту статью?", () => {
    deleteArticleForm.submit()
})

const login = document.querySelector(".nav__button_login")
const popupLogin = document.querySelector(".pop-up__login")
const cancelLogin = document.querySelector(".pop-up__login .pop-up__cancel-btn")
const overlay = document.querySelector(".pop-up__overlay")
const signup = document.querySelector(".nav__button_signup")
const popupSignup = document.querySelector(".pop-up__signup")
const cancelSignup = document.querySelector(
    ".pop-up__signup .pop-up__cancel-btn"
)

if (login) {
    login.onclick = function () {
        slideToggle(popupLogin)
        fadeIn(overlay)
    }
}

if (cancelLogin) {
    cancelLogin.addEventListener("click", function (e) {
        slideToggle(popupLogin)
        fadeOut(overlay)
    })
}

if (overlay) {
    overlay.addEventListener("click", function (e) {
        fadeOut(popupLogin)
        fadeOut(overlay)
        fadeOut(popupSignup)
    })
}

if (signup) {
    signup.onclick = function () {
        slideToggle(popupSignup)
        fadeIn(overlay)
    }
}

if (cancelSignup) {
    cancelSignup.addEventListener("click", function (e) {
        slideToggle(popupSignup)
        fadeOut(overlay)
    })
}

/* Не закрываются выпадающие элементы при повторном клике */

const burger = document.querySelector(".nav__burger")
const menu = document.querySelector(".nav__list")

burger.onclick = function () {
    menu.classList.toggle("nav__list_opened")
}

const search = document.querySelector(".nav__search")
const searchField = document.querySelector(".nav__search-form")

search.onclick = function () {
    searchField.classList.toggle("nav__search-form_opened")
}

const rubricBtn = document.querySelector(".header__rubrics-btn")
const rubrics = document.querySelector(".rubrics")

rubricBtn.onclick = function () {
    rubrics.classList.toggle("rubrics_opened")
}

addFavourite()
sendForm("signup__form", "/api/auth/signup")
sendForm("signin__form", "/api/auth/signin")

const widget = document.querySelector(".instagram-widget__hide-button")
widget.onclick = showMore

function checkCookies() {
    const cookieDate = localStorage.getItem("cookieDate")
    const cookieNotification = document.getElementById("cookie_notification")
    const cookieBtn = cookieNotification.querySelector(".cookie__button")

    // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы
    if (!cookieDate || +cookieDate + 31536000000 < Date.now()) {
        cookieNotification.classList.add("show")
    }

    // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX
    cookieBtn.addEventListener("click", function () {
        localStorage.setItem("cookieDate", Date.now())
        cookieNotification.classList.remove("show")
    })
}
checkCookies()
