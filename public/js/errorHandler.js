import AWN from "awesome-notifications"
import "awesome-notifications/dist/style.css"

const handleAuthErrors = (target, errorText) => {
    const className = target === "signin" ? "login" : target
    const btn = document.querySelector(`.nav__button_${className}`)
    if (btn) {
        const errorsElement = document.createElement("p")
        const referenceElement = document.querySelector(
            `.pop-up__${className} .pop-up__submit`
        )
        const { parentElement } = referenceElement

        errorsElement.classList.add("pop-up__errors")
        parentElement.insertBefore(errorsElement, referenceElement)
        errorsElement.innerText = errorText
        setTimeout(() => {
            parentElement.removeChild(errorsElement)
        }, 10000)
        btn.click()
    }
}

const parseCookie = (str) =>
    str
        .split(";")
        .map((v) => v.split("="))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
                v[1].trim()
            )
            return acc
        }, {})

export const errorHandler = async () => {
    if (document.cookie) {
        const {
            signinError,
            signupError,
            murzatayError,
            murzatayMessage,
            murzatayWarning,
        } = parseCookie(document.cookie)
        document.cookie =
            "signinError=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie =
            "signupError=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie =
            "murzatayError=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie =
            "murzatayMessage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie =
            "murzatayWarning=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        if (signinError || signupError) {
            if (signinError) {
                handleAuthErrors("signin", signinError)
            }
            if (signupError) {
                handleAuthErrors("signup", signupError)
            }
        }
        if (murzatayError) {
            new AWN().alert(murzatayError, { durations: { alert: 0 } })
        }
        if (murzatayMessage) {
            new AWN().success(murzatayMessage, { durations: { success: 0 } })
        }
        if (murzatayWarning) {
            new AWN().warning(murzatayWarning, { durations: { warning: 0 } })
        }
    }
}
