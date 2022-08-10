import axios from "axios"
import React, { useState } from "react"
import { VisibilityToggle } from "./visibility-toggle/VisibilityToggle.jsx"

export function LoginForm(props) {
    const { openSignupModal, openForgotPassModal } = props
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        axios
            .post("/api/auth/signin", {
                username,
                password,
            })
            .then(() => {
                location.reload()
            })
            .catch((e) => {
                if (e.response) {
                    setError(e.response.data.errors.join(", "))
                }
            })
    }

    const resetError = () => {
        setError("")
    }

    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <h2 className="auth-form__title">Войти</h2>
            <label className="auth-form__label">
                <span className="auth-form__label-text">Email/Login</span>
                <input
                    className="auth-form__input"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => {
                        resetError()
                        setUsername(e.target.value)
                    }}
                    required
                />
            </label>
            <label className="auth-form__label">
                <span className="auth-form__label-text">Пароль</span>
                <VisibilityToggle
                    render={(isPassVisible, style) => (
                        <input
                            className="auth-form__input"
                            type={isPassVisible ? "text" : "password"}
                            name="password"
                            required
                            value={password}
                            onChange={(e) => {
                                resetError()
                                setPassword(e.target.value)
                            }}
                            style={{ ...style }}
                        />
                    )}
                />
            </label>

            {error && <p className="auth-form__errors">{error}</p>}

            <button className="auth-form__btn" type="submit">
                Войти
            </button>
            <button
                className="auth-form__link"
                type="button"
                onClick={openForgotPassModal}
            >
                Забыли пароль?
            </button>
            <hr className="auth-form__divider" />
            <div>
                <p className="auth-form__additional-text">Еще нет аккаунта?</p>
                <button className="auth-form__link" onClick={openSignupModal}>
                    Зарегистрироваться
                </button>
            </div>
        </form>
    )
}
