import { addFavourite } from "./addFavourite.js"
import { sendForm } from "./sendFormData.js"
import { showMore } from "./instagram_widget.js"
import { slideToggle, fadeIn, fadeOut } from "./animations.js"

const login = document.querySelector(".log-in")
const popupLogin = document.querySelector(".pop-up__login")
const cancelLogin = document.querySelector(".cancel-login")
const overlay = document.querySelector(".overlay")
const signup = document.querySelector(".sign-up")
const popupSignup = document.querySelector(".pop-up__signup")
const cancelSignup = document.querySelector(".cancel-signup")

if (login) {
    login.onclick = function () {
        slideToggle(popupLogin)
        fadeIn(overlay)
    }
}

if (cancelLogin) {
    cancelLogin.addEventListener("click", function (e) {
        e.preventDefault()
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
        e.preventDefault()
        slideToggle(popupSignup)
        fadeOut(overlay)
    })  
}

/* Не закрываются выпадающие элементы при повторном клике */

const burger = document.querySelector(".mobile-menu")
const menu = document.querySelector(".nav__link-wrapper")

burger.onclick = function () {
    menu.classList.toggle("open")
}

const search = document.querySelector(".search-icon")
const searchField = document.querySelector(".search-wrap")

search.onclick = function () {
    if (searchField.classList.contains("open")) {
        searchField.classList.remove("open")
    } else {
        searchField.classList.add("open")
    }
}

const rubrickBtn = document.querySelector(".mobile-rubrics-btn-wrap")
const rubricks = document.querySelector(".rubrics-mbl-container")

rubrickBtn.onclick = function () {
    if (rubricks.classList.contains("open-rubric")) {
        rubricks.classList.remove("open-rubric")
    } else {
        rubricks.classList.add("open-rubric")
    }
}

addFavourite()
sendForm("signup__form", "/api/auth/signup")
sendForm("signin__form", "/api/auth/signin")

const widget = document.querySelector(".instagram-widget__hide-button")
widget.onclick = showMore

function checkCookies() {
    const cookieDate = localStorage.getItem("cookieDate")
    const cookieNotification = document.getElementById("cookie_notification")
    const cookieBtn = cookieNotification.querySelector(".cookie_accept")

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
// if (module.hot) {
//     // Accept hot update
//     module.hot.accept();
// }