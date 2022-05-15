const isEqual = (val1, val2) => val1 === val2
const validationErrorMessage = "Пароли должны совпадать"

export const signupFormValidator = () => {
    const signupForm = document.getElementById("signup__form")
    if (signupForm) {
        const passwordInput = signupForm.querySelector('[name="password1"]')
        const passwordRepeatInput =
            signupForm.querySelector('[name="password2"]')

        signupForm.addEventListener("submit", (e) => {
            if (!isEqual(passwordInput.value, passwordRepeatInput.value)) {
                e.preventDefault()
                passwordInput.setCustomValidity(validationErrorMessage)
                passwordInput.reportValidity()
            }
        })
        passwordInput.addEventListener("input", () => {
            passwordInput.setCustomValidity("")
        })
    }
}
