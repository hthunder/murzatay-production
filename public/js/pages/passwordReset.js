import { checkBeforeSubmit } from "../validators/checkBeforeSubmit"
import { isEqual } from "../validators/isEqual"

export const passwordReset = () => {
    const forgotPassFormElem = document.querySelector(".forgot-pass__form")

    checkBeforeSubmit(
        () =>
            isEqual(
                forgotPassFormElem.querySelector("input[name='pass1']"),
                forgotPassFormElem.querySelector("input[name='pass2']")
            ),
        forgotPassFormElem,
        "Пароли не совпадают"
    )
}
