export const checkBeforeSubmit = (validator, formElem, warningMsg) => {
    formElem.onsubmit = (e) => {
        e.preventDefault()
        if (!validator()) {
            return window.createNotification({
                closeOnClick: true,
                displayCloseButton: true,
                positionClass: "nfc-top-right",
                showDuration: "5000",
                theme: "error",
            })({
                message: warningMsg,
            })
        }
        return e.currentTarget.submit()
    }
}
