import { getCookie, deleteCookie } from "./getCookie"

const handleAuthErrors = (target, errorText) => {
    const btn = document.querySelector(`.nav__button_${target}`)
    if (btn) {
        const errorPlace = document.querySelector(
            `.pop-up__${target} .pop-up__errors`
        )

        if (errorPlace) {
            errorPlace.innerText = errorText
            deleteCookie("murzatay-error")
            deleteCookie(`call-${target}`)
            setTimeout(() => {
                errorPlace.innerText = ""
            }, 10000)
        }
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
