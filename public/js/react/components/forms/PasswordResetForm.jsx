import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { VisibilityToggle } from "./visibility-toggle/VisibilityToggle.jsx"
import { resetPassword } from "../../api/auth"

function PasswordResetForm() {
    const [password, setPassword] = useState("")
    const [userId, setUserId] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        setToken(searchParams.get("token"))
        setUserId(searchParams.get("id"))
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        if (password && userId && token) {
            resetPassword({ password, userId, token }).then(() => {
                window.location.replace("/?success=Пароль успешно изменен")
            })
        }
    }

    return (
        <div className="modal__content">
            <form className="auth-form" onSubmit={onSubmit}>
                <h2 className="auth-form__title">Смена пароля</h2>
                <label className="auth-form__label">
                    <span className="auth-form__label-text">Новый пароль</span>
                    <VisibilityToggle
                        render={(isPassVisible, style) => (
                            <input
                                className="auth-form__input"
                                type={isPassVisible ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                style={{ ...style }}
                                required
                            />
                        )}
                    />
                </label>
                <button className="auth-form__btn" type="submit">
                    Сменить пароль
                </button>
            </form>
        </div>
    )
}

const domContainer = document.querySelector("#react-password-reset")
const root = createRoot(domContainer)
root.render(<PasswordResetForm />)
