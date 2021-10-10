import AWN from "awesome-notifications"
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
        setTimeout(() => {
            parentElement.removeChild(errorsElement)
        }, 10000)
        btn.click()
    }
}

export const authHandlerModule = async () => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams)
    const murzatayError = params["murzatay-error"]
    const murzatayMessage = params["murzatay-message"]
    const authLogin = params["call-login"]
    const authSignup = params["call-signup"]
    const { pathname } = window.location

    if (murzatayError) {
        if (window.history.replaceState)
            window.history.replaceState({}, null, pathname)
        if (authLogin) {
            handleAuthErrors("login", murzatayError)
        } else if (authSignup) {
            handleAuthErrors("signup", murzatayError)
        } else {
            new AWN().alert(murzatayError, {
                durations: { alert: 0 },
            })
        }
    }

    if (murzatayMessage) {
        if (window.history.replaceState)
            window.history.replaceState({}, null, pathname)
        new AWN().success(murzatayMessage, { durations: { success: 0 } })
    }
}
