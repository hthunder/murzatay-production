import { slideToggle, fadeIn, fadeOut } from "./animations"

const handleClick = (targetElem, animationsArr) => {
    if (targetElem) {
        targetElem.onclick = () => {
            animationsArr.forEach((animation) => {
                animation()
            })
        }
    }
}

export const popupInit = () => {
    const $ = document.querySelector.bind(document)
    const loginBtn = $(".nav__button_login")
    const loginForm = $(".pop-up__login")
    const loginCancelBtn = $(".pop-up__login .pop-up__cancel-btn")
    const signupBtn = $(".nav__button_signup")
    const signupForm = $(".pop-up__signup")
    const signupCancelBtn = $(".pop-up__signup .pop-up__cancel-btn")
    const overlay = $(".pop-up__overlay")

    handleClick(loginBtn, [() => slideToggle(loginForm), () => fadeIn(overlay)])
    handleClick(loginCancelBtn, [
        () => slideToggle(loginForm),
        () => fadeOut(overlay),
    ])
    handleClick(overlay, [
        () => fadeOut(loginForm),
        () => fadeOut(overlay),
        () => fadeOut(signupForm),
    ])
    handleClick(signupBtn, [
        () => slideToggle(signupForm),
        () => fadeIn(overlay),
    ])
    handleClick(signupCancelBtn, [
        () => slideToggle(signupForm),
        () => fadeOut(overlay),
    ])
}
