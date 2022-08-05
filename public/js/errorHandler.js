import AWN from "awesome-notifications"
import "awesome-notifications/dist/style.css"
import { parseCookie, deleteCookie } from "./utils/cookie/cookie"

// const handleAuthErrors = (target, errorText) => {
//     const className = target === "signin" ? "login" : target
//     const btn = document.querySelector(`.nav__button_${className}`)
//     if (btn) {
//         const errorsElement = document.createElement("p")
//         const referenceElement = document.querySelector(
//             `.pop-up__${className} .pop-up__submit`
//         )
//         const { parentElement } = referenceElement

//         errorsElement.classList.add("pop-up__errors")
//         parentElement.insertBefore(errorsElement, referenceElement)
//         errorsElement.innerText = errorText
//         setTimeout(() => {
//             parentElement.removeChild(errorsElement)
//         }, 10000)
//         btn.click()
//     }
// }

export const errorHandler = async () => {
    if (document.cookie) {
        const {
            signinError,
            signupError,
            murzatayError,
            murzatayMessage,
            murzatayWarning,
        } = parseCookie(document.cookie)
        // if (signinError || signupError) {
        //     if (signinError) {
        //         handleAuthErrors("signin", signinError)
        //         deleteCookie("signinError")
        //     }
        //     if (signupError) {
        //         handleAuthErrors("signup", signupError)
        //         deleteCookie("signupError")
        //     }
        // }
        if (murzatayError) {
            new AWN().alert(murzatayError, { durations: { alert: 0 } })
            deleteCookie("murzatayError")
        }
        if (murzatayMessage) {
            new AWN().success(murzatayMessage, { durations: { success: 0 } })
            deleteCookie("murzatayMessage")
        }
        if (murzatayWarning) {
            new AWN().warning(murzatayWarning, { durations: { warning: 0 } })
            deleteCookie("murzatayWarning")
        }
    }
}
