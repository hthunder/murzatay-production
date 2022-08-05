import React, { useRef } from "react"

export function SignupForm(props) {
    const { cancelForm } = props
    const passwordEl = useRef(null)
    const passwordRepeatEl = useRef(null)

    const onSubmit = (e) => {
        if (passwordEl.current.value !== passwordRepeatEl.current.value) {
            e.preventDefault()
            passwordEl.current.setCustomValidity("Пароли должны совпадать")
            passwordEl.current.reportValidity()
        }
    }

    const onInput = (e) => {
        passwordEl.current.setCustomValidity("")
    }

    return (
        <form
            className="pop-up__signup"
            id="signup__form"
            method="POST"
            action="/auth/signup"
            onSubmit={onSubmit}
        >
            <h2 className="pop-up__title">Регистрация</h2>
            <input
                className="pop-up__input"
                type="text"
                placeholder="Login*"
                name="username"
                required
            />
            <input
                className="pop-up__input"
                type="email"
                placeholder="E-mail*"
                name="email"
                required
            />
            <input
                className="pop-up__input"
                type="password"
                placeholder="Пароль*"
                name="password1"
                ref={passwordEl}
                onInput={onInput}
                required
            />
            <input
                className="pop-up__input"
                type="password"
                placeholder="Повторите пароль*"
                name="password2"
                ref={passwordRepeatEl}
                required
            />
            <input
                className="pop-up__input"
                type="text"
                placeholder="Город"
                name="city"
            />
            <button className="pop-up__submit" type="submit">
                Зарегистрироваться
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
