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
    const loginBtn = document.querySelector(".nav__button_login")
    const loginForm = document.querySelector(".pop-up__login")
    const loginCancelBtn = document.querySelector(
        ".pop-up__login .pop-up__cancel-btn"
    )
    const signupBtn = document.querySelector(".nav__button_signup")
    const signupForm = document.querySelector(".pop-up__signup")
    const signupCancelBtn = document.querySelector(
        ".pop-up__signup .pop-up__cancel-btn"
    )
    const overlay = document.querySelector(".pop-up__overlay")

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
