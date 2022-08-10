import { router } from "./router"
import { checkCookies } from "./utils/checkCookies"
import { $ } from "./utils/$"

/* Не закрываются выпадающие элементы при повторном клике */

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
