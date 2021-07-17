import { getCookie, deleteCookie } from "./getCookie"

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
            window.createNotification({
                closeOnClick: true,
                displayCloseButton: true,
                positionClass: "nfc-top-right",
                showDuration: "5000",
                theme: "error",
            })({
                message: murzatayError,
            })
        }
    }

    if (murzatayMessage) {
        deleteCookie("murzatay-message")
        window.createNotification({
            closeOnClick: true,
            displayCloseButton: true,
            positionClass: "nfc-top-right",
            showDuration: "5000",
            theme: "success",
        })({
            message: murzatayMessage,
        })
    }
}
