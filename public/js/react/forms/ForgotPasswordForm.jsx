import React, { useState } from "react"

export function ForgotPasswordForm(props) {
    const { openLoginModal } = props
    const [email, setEmail] = useState("")

    return (
        <form className="auth-form">
            <h2 className="auth-form__title">Забыли пароль?</h2>
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
                Сбросить пароль
            </button>
            <hr className="auth-form__divider" />
            <div>
                <button className="auth-form__link" onClick={openLoginModal}>
                    Вернуться к окну логина
                </button>
            </div>
        </form>
    )
}
