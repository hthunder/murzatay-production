import { slideToggle, fadeIn, fadeOut } from "./animations"
import { $ } from "./utils/$"

export const authPopupInit = () => {
    const loginBtn = $(".nav__button_login")
    const loginForm = $(".pop-up__login")
    const loginCancelBtn = $(".pop-up__login .pop-up__cancel-btn")
    const signupBtn = $(".nav__button_signup")
    const signupForm = $(".pop-up__signup")
    const signupCancelBtn = $(".pop-up__signup .pop-up__cancel-btn")
    const overlay = $(".pop-up__overlay")

    ;[loginBtn, signupBtn].forEach((btn) => {
        btn?.addEventListener("click", function () {
            this === loginBtn ? slideToggle(loginForm) : slideToggle(signupForm)
            fadeIn(overlay)
        })
    })
    ;[loginCancelBtn, signupCancelBtn].forEach((btn) => {
        btn?.addEventListener("click", function () {
            this === loginCancelBtn
                ? slideToggle(loginForm)
                : slideToggle(signupForm)
            fadeOut(overlay)
        })
    })
    overlay?.addEventListener("click", function () {
        fadeOut(loginForm)
        fadeOut(signupForm)
        fadeOut(overlay)
    })
}
