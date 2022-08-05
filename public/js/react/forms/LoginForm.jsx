import React from "react"

export function LoginForm(props) {
    const { cancelForm } = props

    return (
        <form
            className="pop-up__login"
            id="signin__form"
            method="POST"
            action="/auth/signin"
        >
            <h2 className="pop-up__title pop-up__login-elem">Войти</h2>
            <input
                className="pop-up__input pop-up__login-elem"
                type="text"
                placeholder="E-mail/Login"
                name="username"
                required
            />
            <input
                className="pop-up__input pop-up__login-elem"
                type="password"
                placeholder="Пароль"
                name="password"
                required
            />
            <a href="/auth/forgot-pass" className="pop-up__link">
                Забыли пароль?
            </a>
            <button className="pop-up__submit pop-up__login-elem" type="submit">
                Войти
            </button>
            <button
                className="pop-up__cancel-btn"
                type="button"
                onClick={cancelForm}
            >
                Отменить
            </button>
        </form>
    )
}
