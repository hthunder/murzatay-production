const changeAction = (form) => {
    if (form.action.indexOf("/auth/signin") !== -1) {
        form.action = `/auth/forgot-pass`
        return
    }
    form.action = `/auth/signin`
}

const forgotPassToggle = (form) => {
    document
        .querySelectorAll(".pop-up__login .pop-up__login-elem")
        .forEach((el) => el.classList.toggle("pop-up__login-elem_hidden"))
    document
        .querySelectorAll(".pop-up__login .pop-up__forgot-pass-elem")
        .forEach((el) => el.classList.toggle("pop-up__forgot-pass-elem_hidden"))
    changeAction(form)
}

export const forgotPassModule = () => {
    const forgotPassBtn = document.querySelector(".pop-up__forgot-pass")
    const backToLogin = document.querySelector(".pop-up__back-to-login")
    const moduleForm = document.querySelector(".pop-up__login")

    if (forgotPassBtn) {
        forgotPassBtn.onclick = () => forgotPassToggle(moduleForm)
    }

    if (backToLogin) {
        backToLogin.onclick = () => forgotPassToggle(moduleForm)
    }
}
