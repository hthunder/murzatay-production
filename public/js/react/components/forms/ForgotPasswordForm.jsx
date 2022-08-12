import React, { useState } from "react"
import { queryResetLink } from "../../api/auth"

export function ForgotPasswordForm(props) {
    const { openLoginModal } = props
    const [email, setEmail] = useState("")
    const [isFormSent, setIsFormSent] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        queryResetLink({ email }).then(() => {
            setIsFormSent(true)
        })
    }

    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <h2 className="auth-form__title">Забыли пароль?</h2>

            {isFormSent ? (
                <p className="auth-form__paragraph">
                    Если почтовый адрес существует, то вам придет письмо с
                    дальнейшими инструкциями
                </p>
            ) : (
                <>
                    <label className="auth-form__label">
                        <span className="auth-form__label-text">Email:</span>
                        <input
                            className="auth-form__input"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            required
                        />
                    </label>
                    <button className="auth-form__btn" type="submit">
                        Восстановить
                    </button>
                </>
            )}

            <hr className="auth-form__divider" />
            <div>
                <button className="auth-form__link" onClick={openLoginModal}>
                    Вернуться к окну логина
                </button>
            </div>
        </form>
    )
}
