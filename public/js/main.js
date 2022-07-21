import { router } from "./router"
import { sidebarComments } from "./widgets/sidebarComments"
import { errorHandler } from "./errorHandler"
import { popupInit } from "./popupInit"
import { checkCookies } from "./utils/checkCookies"
import { toggleDisplayNone } from "./utils/toggleDisplayNone"
import { signupFormValidator } from "./forms/signupFormValidator"
import * as api from "./api/api"
import { $ } from "./utils/$"

popupInit()

/* Не закрываются выпадающие элементы при повторном клике */
;(function initDropdownHandlers() {
    const searchForm = $(".nav__search-form")

    $(".nav__burger")?.addEventListener("click", () => {
        $(".nav__list").classList.toggle("nav__list_opened")
        searchForm.classList.toggle("nav__search-form_opened")
        toggleDisplayNone($(".nav__logo"))
    })

    $(".nav__search")?.addEventListener("click", () => {
        searchForm.submit()
    })

    $(".header__rubrics-btn")?.addEventListener("click", () =>
        $(".rubrics").classList.toggle("rubrics_opened")
    )

    $(".topic__add-favourite")?.addEventListener("click", (e) => {
        api.addFavourite(e.target)
    })
})()

checkCookies()

router()
sidebarComments()

errorHandler()
signupFormValidator()
