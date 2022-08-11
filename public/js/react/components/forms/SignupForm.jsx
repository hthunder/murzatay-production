import axios from "axios"
import React, { useState, useRef } from "react"
import { VisibilityToggle } from "./visibility-toggle/VisibilityToggle.jsx"

function ActivationInfo(props) {
    const { email } = props

    return (
        <>
            <h2 className="auth-form__title">Почти готово...</h2>
            <p className="auth-form__paragraph">
                Мы отправили письмо на почтовый ящик:{" "}
                <span className="font-bold">{email}</span>
            </p>
            <p className="auth-form__paragraph">
                Перейдите по полученной ссылке для активации аккаунта
            </p>
        </>
    )
}

export function SignupForm(props) {
    const { openLoginModal } = props
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const [isActivationStep, setIsActivationStep] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        axios
            .post("/api/auth/signup", values)
            .then(() => {
                setIsActivationStep(true)
            })
            .catch((e) => {
                if (e.response) {
                    setError(e.response.data.errors.join(", "))
                }
            })
    }

    const onChange = (e) => {
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <>
            {isActivationStep ? (
                <ActivationInfo email={values.email} />
            ) : (
                <form className="auth-form" onSubmit={onSubmit}>
                    <h2 className="auth-form__title">Регистрация</h2>
                    <label className="auth-form__label">
                        <span className="auth-form__label-text">Login*</span>
                        <input
                            className="auth-form__input"
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={onChange}
                            required
                        />
                    </label>
                    <label className="auth-form__label">
                        <span className="auth-form__label-text">Email*</span>
                        <input
                            className="auth-form__input"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={onChange}
                            required
                        />
                    </label>
                    <label className="auth-form__label">
                        <span className="auth-form__label-text">Пароль*</span>
                        <VisibilityToggle
                            render={(isPassVisible, style) => (
                                <input
                                    className="auth-form__input"
                                    type={isPassVisible ? "text" : "password"}
                                    name="password"
                                    value={values.password}
                                    onChange={onChange}
                                    style={{ ...style }}
                                    required
                                />
                            )}
                        />
                    </label>
                    {error && <p className="auth-form__errors error">{error}</p>}
                    <button className="auth-form__btn" type="submit">
                        Зарегистрироваться
                    </button>
                    <hr className="auth-form__divider" />
                    <div>
                        <p className="auth-form__additional-text">
                            Уже есть аккаунт?
                        </p>
                        <button
                            className="auth-form__link"
                            onClick={openLoginModal}
                        >
                            Войти
                        </button>
                    </div>
                </form>
            )}
        </>
    )
}
