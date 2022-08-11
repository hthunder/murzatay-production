import Toastify from "toastify-js"

/* Не закрываются выпадающие элементы при повторном клике */
import { router } from "./router"
import { checkCookies } from "./utils/checkCookies"
import { $ } from "./utils/$"

const urlParams = new URLSearchParams(window.location.search)

const successMessage = urlParams.get("success")
if (successMessage) {
    Toastify({
        text: successMessage,
        duration: 10000,
        avatar: "/static/img/icons/checkmark.svg",
        style: {
            background: "white",
            color: "black",
            fontFamily: "Raleway",
            fontSize: "16px",
        },
    }).showToast()
}

;(function initDropdownHandlers() {
    const searchForm = $(".nav__search-form")

    $(".nav__burger")?.addEventListener("click", () => {
        $(".nav__list").classList.toggle("nav__list_opened")
        searchForm.classList.toggle("nav__search-form_opened")
        $(".nav__logo").classList.toggle("hidden")
    })

    $(".nav__search")?.addEventListener("click", () => {
        searchForm.submit()
    })

    $(".header__rubrics-btn")?.addEventListener("click", () =>
        $(".rubrics").classList.toggle("rubrics_opened")
    )
})()

checkCookies()

router()
