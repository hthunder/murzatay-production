import AWN from "awesome-notifications"
import { getCookie, deleteCookie } from "./getCookie"
import "awesome-notifications/dist/style.css"

const handleAuthErrors = (target, errorText) => {
    const btn = document.querySelector(`.nav__button_${target}`)
    if (btn) {
        const errorsElement = document.createElement("p")
        const referenceElement = document.querySelector(
            `.pop-up__${target} .pop-up__submit`
        )
        const { parentElement } = referenceElement

        errorsElement.classList.add("pop-up__errors")
        parentElement.insertBefore(errorsElement, referenceElement)
        errorsElement.innerText = errorText
        deleteCookie("murzatay-error")
        deleteCookie(`call-${target}`)
        setTimeout(() => {
            parentElement.removeChild(errorsElement)
        }, 10000)
        btn.click()
    }
}

export const authHandlerModule = async () => {
    const murzatayError = getCookie("murzatay-error")
    const murzatayMessage = getCookie("murzatay-message")
    const authLogin = getCookie("call-login")
    const authSignup = getCookie("call-signup")

    if (murzatayError) {
        if (authLogin) {
            handleAuthErrors("login", murzatayError)
        } else if (authSignup) {
            handleAuthErrors("signup", murzatayError)
        } else {
            deleteCookie("murzatay-error")
            new AWN().alert(murzatayError, {
                durations: { alert: 0 },
            })
        }
    }

    if (murzatayMessage) {
        deleteCookie("murzatay-message")
        new AWN().success(murzatayMessage, { durations: { success: 0 } })
    }
}
