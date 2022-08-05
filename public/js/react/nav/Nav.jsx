import axios from "axios"
import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { links, states } from "./constants.js"
import { Popup } from "../popup/Popup.jsx"
import { LoginForm } from "../forms/LoginForm.jsx"
import { SignupForm } from "../forms/SignupForm.jsx"

const disableScrolling = () => {
    document.body.classList.add("stop-scrolling")
}

const enableScrolling = () => {
    document.body.classList.remove("stop-scrolling")
}

function Nav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [popupState, setPopupState] = useState(null)
    useEffect(() => {
        axios.get("/api/logged_in").then((response) => {
            setIsLoggedIn(response.data.userId)
        })
    }, [])

    const cancelForm = () => {
        setPopupState(null)
        enableScrolling()
    }

    return (
        <>
            {links.map(({ text, href, auth }) => {
                const shouldRender = !auth || (auth && isLoggedIn)
                return (
                    <React.Fragment key={href}>
                        {shouldRender && (
                            <li className="nav__item">
                                <a href={href} className="nav__link">
                                    {text}
                                </a>
                            </li>
                        )}
                    </React.Fragment>
                )
            })}
            {!isLoggedIn && (
                <>
                    <li className="nav__item">
                        <button
                            className="nav__button nav__button_login"
                            onClick={() => {
                                setPopupState(states.loginOpened)
                                disableScrolling()
                            }}
                        >
                            Войти
                        </button>
                    </li>
                    <li className="nav__item">
                        <button
                            className="nav__button nav__button_signup"
                            onClick={() => {
                                setPopupState(states.signupOpened)
                                disableScrolling()
                            }}
                        >
                            Зарегистрироваться
                        </button>
                    </li>
                </>
            )}
            {popupState === states.loginOpened && (
                <Popup>
                    <LoginForm cancelForm={cancelForm} />
                </Popup>
            )}
            {popupState === states.signupOpened && (
                <Popup>
                    <SignupForm cancelForm={cancelForm} />
                </Popup>
            )}
        </>
    )
}

const domContainer = document.querySelector("#react-nav")
const root = createRoot(domContainer)
root.render(<Nav />)
